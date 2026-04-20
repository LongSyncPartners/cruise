using CruiseHousing.Api.Data;
using CruiseHousing.Api.Entities;
using CruiseHousing.Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CruiseHousing.Api.Repositories.Implementations;

public class PropertyIncomeExpenseMonthlyRepository : IPropertyIncomeExpenseMonthlyRepository
{
    private readonly AppDbContext _dbContext;

    public PropertyIncomeExpenseMonthlyRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<PropertyIncomeExpenseMonthly>> GetAllAsync()
    {
        return await _dbContext.PropertyIncomeExpenseMonthlies
            .Where(x => x.DeletedAt == null)
            .OrderBy(x => x.PropertyId)
            .ThenBy(x => x.TargetYearMonth)
            .ToListAsync();
    }

    public async Task<List<PropertyIncomeExpenseMonthly>> GetByPropertyIdAsync(long propertyId)
    {
        return await _dbContext.PropertyIncomeExpenseMonthlies
            .Where(x => x.PropertyId == propertyId && x.DeletedAt == null)
            .OrderBy(x => x.TargetYearMonth)
            .ToListAsync();
    }

    public async Task<PropertyIncomeExpenseMonthly?> GetByIdAsync(long id)
    {
        return await _dbContext.PropertyIncomeExpenseMonthlies
            .FirstOrDefaultAsync(x => x.Id == id && x.DeletedAt == null);
    }

    public async Task<PropertyIncomeExpenseMonthly> AddAsync(PropertyIncomeExpenseMonthly entity)
    {
        _dbContext.PropertyIncomeExpenseMonthlies.Add(entity);
        await _dbContext.SaveChangesAsync();
        return entity;
    }

    public async Task UpdateAsync(PropertyIncomeExpenseMonthly entity)
    {
        _dbContext.PropertyIncomeExpenseMonthlies.Update(entity);
        await _dbContext.SaveChangesAsync();
    }
}