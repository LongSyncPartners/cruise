using CruiseHousing.Api.DTOs;
using CruiseHousing.Api.Features.User.DTOs;

namespace CruiseHousing.Api.Repositories;

/// <summary>
/// ユーザー検索Repositoryインターフェース
/// </summary>
public interface IUserSearchRepository
{
    /// <summary>
    /// ユーザー検索（ページング）
    /// </summary>
    /// <param name="request">検索条件</param>
    /// <returns>ユーザー一覧</returns>
    Task<PagedResult<UserDto>> SearchAsync(UserSearchRequest request);
}