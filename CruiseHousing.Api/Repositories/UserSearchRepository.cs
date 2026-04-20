using CruiseHousing.Api.Data;
using CruiseHousing.Api.DTOs;
using CruiseHousing.Api.Features.User.DTOs;
using Microsoft.EntityFrameworkCore;

namespace CruiseHousing.Api.Repositories;

public class UserSearchRepository
{
    private readonly AppDbContext _db;

    public UserSearchRepository(AppDbContext db)
    {
        _db = db;
    }

    public async Task<PagedResult<UserDto>> SearchAsync(UserSearchRequest request)
    {
        var query = _db.Users
            .AsNoTracking()
            .AsQueryable();

        // filter user_name
        if (!string.IsNullOrWhiteSpace(request.UserName))
        {
            query = query.Where(u =>
                u.UserName.Contains(request.UserName));
        }

        // filter email
        if (!string.IsNullOrWhiteSpace(request.UserEmail))
        {
            query = query.Where(u =>
                u.UserEmail.Contains(request.UserEmail));
        }

        var totalCount = await query.CountAsync();

        var users = await query
            .OrderBy(u => u.UserId)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(u => new UserDto
            {
                UserId = u.UserId,
                UserName = u.UserName,
                UserEmail = u.UserEmail
            })
            .ToListAsync();

        return new PagedResult<UserDto>
        {
            Items = users,
            TotalCount = totalCount
        };
    }
}

