using CruiseHousing.Api.Data;
using Microsoft.EntityFrameworkCore;
using CruiseHousing.Api.Entities;

namespace CruiseHousing.Api.Repositories;

public class PropertyStatusRepository : IPropertyStatusRepository
{
    private readonly AppDbContext _context;

    public PropertyStatusRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<PropertyStatus>> GetAllActiveAsync()
    {
        return await _context.PropertyStatuses
            .AsNoTracking()
            .Where(x => x.IsActive && x.DeletedAt == null)
            .OrderBy(x => x.DisplayOrder)
            .ThenBy(x => x.Id)
            .ToListAsync();
    }

    public async Task<PropertyStatus?> GetByCodeAsync(string code)
    {
        return await _context.PropertyStatuses
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Code == code && x.IsActive && x.DeletedAt == null);
    }
}
