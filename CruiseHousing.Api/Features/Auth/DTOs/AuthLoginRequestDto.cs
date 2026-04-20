namespace CruiseHousing.Api.Features.Auth.DTOs;

public class AuthLoginRequestDto
{
    /// <summary>
    /// ログインIDまたはメールアドレス
    /// </summary>
    public string LoginIdOrEmail { get; set; } = string.Empty;

    /// <summary>
    /// パスワード
    /// </summary>
    public string Password { get; set; } = string.Empty;
}