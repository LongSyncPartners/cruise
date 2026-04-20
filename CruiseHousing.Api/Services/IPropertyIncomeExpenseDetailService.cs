using CruiseHousing.Api.Dtos.PropertyIncomeExpenseDetails;

namespace CruiseHousing.Api.Services.Interfaces;

public interface IPropertyIncomeExpenseDetailService
{
    Task<List<PropertyIncomeExpenseDetailResponse>> GetAllAsync();
    Task<List<PropertyIncomeExpenseDetailResponse>> GetByPropertyIdAsync(long propertyId);
    Task<PropertyIncomeExpenseDetailResponse?> GetByIdAsync(long id);
    Task<PropertyIncomeExpenseDetailResponse> CreateAsync(PropertyIncomeExpenseDetailCreateRequest request);
    Task<bool> UpdateAsync(long id, PropertyIncomeExpenseDetailUpdateRequest request);
    Task<bool> DeleteAsync(long id, long? deletedBy);
}