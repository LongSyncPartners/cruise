using CruiseHousing.Api.Data;
using CruiseHousing.Api.DTOs;
using CruiseHousing.Api.Features.User;
using CruiseHousing.Api.Features.User.DTOs;
using Microsoft.EntityFrameworkCore;

public class UserSearchService : IUserSearchService
{
    private readonly ILogger<UserService> _logger;
    private readonly AppDbContext _db;

    public UserSearchService(ILogger<UserService> logger, AppDbContext db)
    {
        _logger = logger;
        _db = db; 
    }

    public async Task<PagedResult<UserDto>> SearchAsync(UserSearchRequest request)
    {
        _logger.LogInformation(
            "Search user for condition {@Request}",
            request);

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
                u.Email.Contains(request.UserEmail));
        }

        var totalCount = await query.CountAsync();

        var users = await query
            .OrderBy(u => u.Id)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(u => new UserDto
            {
                Id = u.Id,
                UserName = u.UserName,
                Email = u.Email
            })
            .ToListAsync();

        return new PagedResult<UserDto>
        {
            Items = users,
            TotalCount = totalCount
        };
    }
}