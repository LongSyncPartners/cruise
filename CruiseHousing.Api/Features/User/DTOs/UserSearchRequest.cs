namespace CruiseHousing.Api.Features.User.DTOs
{
    public class UserSearchRequest
    {
        public string? UserName { get; set; }
        public string? UserEmail { get; set; }

        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 20;
    }
}
