using CruiseHousing.Api.Data;
using CruiseHousing.Api.Entities;
using CruiseHousing.Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CruiseHousing.Api.Repositories.Implementations;

public class PropertyRepository : IPropertyRepository
{
    private readonly AppDbContext _dbContext;

    public PropertyRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<Property>> GetAllAsync()
    {
        return await _dbContext.Properties
            .Where(x => x.DeletedAt == null)
            .OrderBy(x => x.Id)
            .ToListAsync();
    }

    public async Task<Property?> GetByIdAsync(long id)
    {
        return await _dbContext.Properties
            .FirstOrDefaultAsync(x => x.Id == id && x.DeletedAt == null);
    }

    public async Task<Property> AddAsync(Property entity)
    {
        _dbContext.Properties.Add(entity);
        await _dbContext.SaveChangesAsync();
        return entity;
    }

    public async Task UpdateAsync(Property entity)
    {
        _dbContext.Properties.Update(entity);
        await _dbContext.SaveChangesAsync();
    }
}