using CruiseHousing.Api.Data;
using Microsoft.EntityFrameworkCore;
using CruiseHousing.Api.Entities;

namespace CruiseHousing.Api.Repositories
    ;
public class PropertyTypeRepository : IPropertyTypeRepository
{
    private readonly AppDbContext _context;

    public PropertyTypeRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<PropertyType>> GetAllActiveAsync()
    {
        return await _context.PropertyTypes
            .AsNoTracking()
            .Where(x => x.IsActive && x.DeletedAt == null)
            .OrderBy(x => x.DisplayOrder)
            .ThenBy(x => x.Id)
            .ToListAsync();
    }

    public async Task<PropertyType?> GetByCodeAsync(string code)
    {
        return await _context.PropertyTypes
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Code == code && x.IsActive && x.DeletedAt == null);
    }
}