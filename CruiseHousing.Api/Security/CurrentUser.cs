using System.Security.Claims;

namespace CruiseHousing.Api.Security
{
    public class CurrentUser
    {
        public long UserId { get; }
        public string? UserName { get; }
        public string? Email { get; }
        public string? Role { get; }

        public CurrentUser(IHttpContextAccessor accessor)
        {
            var user = accessor.HttpContext?.User;

            if (user == null || !user.Identity?.IsAuthenticated == true)
                return;

            UserId = long.Parse(user.FindFirstValue(ClaimTypes.NameIdentifier) ?? "0");
            UserName = user.Identity?.Name;
            Email = user.FindFirstValue(ClaimTypes.Email);
            Role = user.FindFirstValue(ClaimTypes.Role);
        }
    }
}
