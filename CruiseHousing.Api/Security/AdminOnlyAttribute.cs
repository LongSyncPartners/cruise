using Microsoft.AspNetCore.Authorization;

namespace CruiseHousing.Api.Security;

public class AdminOnlyAttribute : AuthorizeAttribute
{
    public AdminOnlyAttribute()
    {
        Roles = Security.Roles.Admin;
    }
}