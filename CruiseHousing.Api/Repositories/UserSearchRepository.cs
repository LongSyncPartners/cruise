using CruiseHousing.Api.Data;
using CruiseHousing.Api.DTOs;
using CruiseHousing.Api.Features.User.DTOs;
using Microsoft.EntityFrameworkCore;

namespace CruiseHousing.Api.Repositories;

/// <summary>
/// ユーザー検索Repository
/// </summary>
public class UserSearchRepository : IUserSearchRepository
{
    private readonly AppDbContext _dbContext;

    /// <summary>
    /// コンストラクタ
    /// </summary>
    public UserSearchRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    /// <summary>
    /// ユーザー検索
    /// </summary>
    public async Task<PagedResult<UserDto>> SearchAsync(UserSearchRequest request)
    {
        var page = request.Page <= 0 ? 1 : request.Page;
        var pageSize = request.PageSize <= 0 ? 10 : request.PageSize;

        var query = _dbContext.Users
            .Include(x => x.Role)
            .AsNoTracking()
            .Where(x => x.DeletedAt == null)
            .AsQueryable();

        // user_name filter
        if (!string.IsNullOrWhiteSpace(request.UserName))
        {
            query = query.Where(x => x.UserName.Contains(request.UserName));
        }

        // email filter
        if (!string.IsNullOrWhiteSpace(request.UserEmail))
        {
            query = query.Where(x => x.Email.Contains(request.UserEmail));
        }

        var totalCount = await query.CountAsync();

        var users = await query
            .OrderBy(x => x.Id)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new UserDto
            {
                Id = x.Id,
                LoginId = x.LoginId,
                UserName = x.UserName,
                Email = x.Email,
                RoleId = x.RoleId,
                RoleName = x.Role != null ? x.Role.Name : null,
                IsActive = x.IsActive
            })
            .ToListAsync();

        return new PagedResult<UserDto>
        {
            Items = users,
            TotalCount = totalCount
        };
    }
}