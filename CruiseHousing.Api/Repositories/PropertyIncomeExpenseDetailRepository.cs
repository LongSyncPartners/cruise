using CruiseHousing.Api.Data;
using CruiseHousing.Api.Entities;
using CruiseHousing.Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CruiseHousing.Api.Repositories.Implementations;

public class PropertyIncomeExpenseDetailRepository : IPropertyIncomeExpenseDetailRepository
{
    private readonly AppDbContext _dbContext;

    public PropertyIncomeExpenseDetailRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<PropertyIncomeExpenseDetail>> GetAllAsync()
    {
        return await _dbContext.PropertyIncomeExpenseDetails
            .Where(x => x.DeletedAt == null)
            .OrderBy(x => x.PropertyId)
            .ThenBy(x => x.DisplayOrder)
            .ToListAsync();
    }

    public async Task<List<PropertyIncomeExpenseDetail>> GetByPropertyIdAsync(long propertyId)
    {
        return await _dbContext.PropertyIncomeExpenseDetails
            .Where(x => x.PropertyId == propertyId && x.DeletedAt == null)
            .OrderBy(x => x.DisplayOrder)
            .ToListAsync();
    }

    public async Task<PropertyIncomeExpenseDetail?> GetByIdAsync(long id)
    {
        return await _dbContext.PropertyIncomeExpenseDetails
            .FirstOrDefaultAsync(x => x.Id == id && x.DeletedAt == null);
    }

    public async Task<PropertyIncomeExpenseDetail> AddAsync(PropertyIncomeExpenseDetail entity)
    {
        _dbContext.PropertyIncomeExpenseDetails.Add(entity);
        await _dbContext.SaveChangesAsync();
        return entity;
    }

    public async Task UpdateAsync(PropertyIncomeExpenseDetail entity)
    {
        _dbContext.PropertyIncomeExpenseDetails.Update(entity);
        await _dbContext.SaveChangesAsync();
    }
}