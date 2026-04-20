using CruiseHousing.Api.Features.PropertyIncomeExpenseDetails.DTOs;

namespace CruiseHousing.Api.Features.PropertyIncomeExpenseDetails;

public interface IPropertyIncomeExpenseMonthlyService
{
    Task<List<PropertyIncomeExpenseMonthlyResponse>> GetAllAsync();
    Task<List<PropertyIncomeExpenseMonthlyResponse>> GetByPropertyIdAsync(long propertyId);
    Task<PropertyIncomeExpenseMonthlyResponse?> GetByIdAsync(long id);
    Task<PropertyIncomeExpenseMonthlyResponse> CreateAsync(PropertyIncomeExpenseMonthlyCreateRequest request);
    Task<bool> UpdateAsync(long id, PropertyIncomeExpenseMonthlyUpdateRequest request);
    Task<bool> DeleteAsync(long id, long? deletedBy);
}