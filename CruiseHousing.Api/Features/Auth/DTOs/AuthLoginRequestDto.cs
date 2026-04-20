namespace CruiseHousing.Api.Features.Auth.DTOs
{
    public class AuthLoginRequestDto
    {
        public string UserEmail { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
