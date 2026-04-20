using CruiseHousing.Api.Data;
using Microsoft.EntityFrameworkCore;
using CruiseHousing.Api.Entities;

namespace CruiseHousing.Api.Repositories;

public class ProcessingStatusRepository : IProcessingStatusRepository
{
    private readonly AppDbContext _context;

    public ProcessingStatusRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<ProcessingStatus>> GetAllActiveAsync()
    {
        return await _context.ProcessingStatuses
            .AsNoTracking()
            .Where(x => x.IsActive && x.DeletedAt == null)
            .OrderBy(x => x.DisplayOrder)
            .ThenBy(x => x.Id)
            .ToListAsync();
    }

    public async Task<ProcessingStatus?> GetByCodeAsync(string code)
    {
        return await _context.ProcessingStatuses
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Code == code && x.IsActive && x.DeletedAt == null);
    }
}
