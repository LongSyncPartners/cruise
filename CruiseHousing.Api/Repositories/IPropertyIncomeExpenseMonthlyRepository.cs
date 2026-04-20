using CruiseHousing.Api.Entities;

namespace CruiseHousing.Api.Repositories.Interfaces;

public interface IPropertyIncomeExpenseMonthlyRepository
{
    Task<List<PropertyIncomeExpenseMonthly>> GetAllAsync();
    Task<List<PropertyIncomeExpenseMonthly>> GetByPropertyIdAsync(long propertyId);
    Task<PropertyIncomeExpenseMonthly?> GetByIdAsync(long id);
    Task<PropertyIncomeExpenseMonthly> AddAsync(PropertyIncomeExpenseMonthly entity);
    Task UpdateAsync(PropertyIncomeExpenseMonthly entity);
}