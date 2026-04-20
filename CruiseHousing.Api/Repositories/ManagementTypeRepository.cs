using CruiseHousing.Api.Data;
using Microsoft.EntityFrameworkCore;
using CruiseHousing.Api.Entities;

namespace CruiseHousing.Api.Repositories;

public class ManagementTypeRepository : IManagementTypeRepository
{
    private readonly AppDbContext _context;

    public ManagementTypeRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<ManagementType>> GetAllActiveAsync()
    {
        return await _context.ManagementTypes
            .AsNoTracking()
            .Where(x => x.IsActive && x.DeletedAt == null)
            .OrderBy(x => x.DisplayOrder)
            .ThenBy(x => x.Id)
            .ToListAsync();
    }

    public async Task<ManagementType?> GetByCodeAsync(string code)
    {
        return await _context.ManagementTypes
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Code == code && x.IsActive && x.DeletedAt == null);
    }
}
