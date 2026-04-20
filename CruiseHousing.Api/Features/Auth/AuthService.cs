using CruiseHousing.Api.Exceptions;
using CruiseHousing.Api.Features.Auth.DTOs;
using CruiseHousing.Api.Repositories;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CruiseHousing.Api.Features.Login;

public class AuthService
{
    private readonly UserRepository _userRepository;
    private readonly IConfiguration _configuration;
    private readonly ILogger<AuthService> _logger;

    public AuthService(
        UserRepository userRepository,
        IConfiguration configuration,
        ILogger<AuthService> logger)
    {
        _userRepository = userRepository;
        _configuration = configuration;
        _logger = logger;
    }

    public async Task<AuthLoginResponseDto> LoginAsync(AuthLoginRequestDto request)
    {
        _logger.LogInformation("Login attempt for email {UserEmail}", request.UserEmail);

        var user = await _userRepository.GetByEmailAsync(request.UserEmail);
        if (user == null)
        {
            throw new BusinessException("メールアドレスまたはパスワードが正しくありません。", "LOGIN_FAILED");
        }

        var passwordValid = BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash);
        if (!passwordValid)
        {
            throw new BusinessException("メールアドレスまたはパスワードが正しくありません。", "LOGIN_FAILED");
        }

        var expiresMinutes = int.Parse(_configuration["Jwt:AccessTokenExpirationMinutes"]!);
        var expiresAt = DateTime.UtcNow.AddMinutes(expiresMinutes);

        var token = GenerateJwtToken(user.UserId, user.UserName, user.UserEmail, expiresAt);

        _logger.LogInformation("Login success for userId {UserId}", user.UserId);

        return new AuthLoginResponseDto
        {
            AccessToken = token,
            ExpiresAt = expiresAt,
            UserId = user.UserId,
            UserName = user.UserName,
            UserEmail = user.UserEmail
        };
    }

    private string GenerateJwtToken(long userId, string userName, string userEmail, DateTime expiresAt)
    {
        var issuer = _configuration["Jwt:Issuer"]!;
        var audience = _configuration["Jwt:Audience"]!;
        var secretKey = _configuration["Jwt:SecretKey"]!;

        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, userId.ToString()),
            new(JwtRegisteredClaimNames.Email, userEmail),
            new(ClaimTypes.NameIdentifier, userId.ToString()),
            new(ClaimTypes.Name, userName),
            new(ClaimTypes.Email, userEmail),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: expiresAt,
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}