using CruiseHousing.Api.Features.Auth.DTOs;

namespace CruiseHousing.Api.Features.Auth;

public interface IAuthService
{
    Task<AuthLoginResponseDto> LoginAsync(AuthLoginRequestDto request);
}