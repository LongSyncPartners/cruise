using CruiseHousing.Api.DTOs;
using CruiseHousing.Api.Features.User.DTOs;

namespace CruiseHousing.Api.Features.User;

public interface IUserSearchService
{
    Task<PagedResult<UserDto>> SearchAsync(UserSearchRequest request);
}