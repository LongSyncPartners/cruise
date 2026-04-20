using CruiseHousing.Api.Entities;

namespace CruiseHousing.Api.Repositories.Interfaces;

public interface IPropertyIncomeExpenseDetailRepository
{
    Task<List<PropertyIncomeExpenseDetail>> GetAllAsync();
    Task<List<PropertyIncomeExpenseDetail>> GetByPropertyIdAsync(long propertyId);
    Task<PropertyIncomeExpenseDetail?> GetByIdAsync(long id);
    Task<PropertyIncomeExpenseDetail> AddAsync(PropertyIncomeExpenseDetail entity);
    Task UpdateAsync(PropertyIncomeExpenseDetail entity);
}