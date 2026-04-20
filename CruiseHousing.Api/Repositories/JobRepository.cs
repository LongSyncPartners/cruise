using CruiseHousing.Api.Data;
using CruiseHousing.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace CruiseHousing.Api.Repositories;

public class JobRepository
{
    private readonly AppDbContext _db;

    public JobRepository(AppDbContext db)
    {
        _db = db;
    }

    public async Task<Job?> GetByIdAsync(long jobId)
    {
        return await _db.Jobs
            .FirstOrDefaultAsync(x => x.JobId == jobId);
    }

    public async Task<List<Job>> GetAllAsync()
    {
        return await _db.Jobs
            .AsNoTracking()
            .OrderByDescending(x => x.JobId)
            .ToListAsync();
    }

    public async Task<List<Job>> GetByRequestedByAsync(long requestedBy)
    {
        return await _db.Jobs
            .AsNoTracking()
            .Where(x => x.RequestedBy == requestedBy)
            .OrderByDescending(x => x.JobId)
            .ToListAsync();
    }

    public async Task AddAsync(Job job)
    {
        await _db.Jobs.AddAsync(job);
    }

    public Task UpdateAsync(Job job)
    {
        _db.Jobs.Update(job);
        return Task.CompletedTask;
    }

    public Task DeleteAsync(Job job)
    {
        _db.Jobs.Remove(job);
        return Task.CompletedTask;
    }

    public async Task SaveChangesAsync()
    {
        await _db.SaveChangesAsync();
    }
}