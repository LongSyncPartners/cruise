using CruiseHousing.Api.Features.PropertyIncomeExpenseDetails.DTOs;

namespace CruiseHousing.Api.Features.PropertyIncomeExpenseDetails;

public interface IPropertyIncomeExpenseDetailService
{
    Task<List<PropertyIncomeExpenseDetailResponse>> GetAllAsync();
    Task<List<PropertyIncomeExpenseDetailResponse>> GetByPropertyIdAsync(long propertyId);
    Task<PropertyIncomeExpenseDetailResponse?> GetByIdAsync(long id);
    Task<PropertyIncomeExpenseDetailResponse> CreateAsync(PropertyIncomeExpenseDetailCreateRequest request);
    Task<bool> UpdateAsync(long id, PropertyIncomeExpenseDetailUpdateRequest request);
    Task<bool> DeleteAsync(long id, long? deletedBy);
}