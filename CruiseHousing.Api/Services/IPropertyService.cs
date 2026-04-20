using CruiseHousing.Api.Dtos.Properties;

namespace CruiseHousing.Api.Services.Interfaces;

public interface IPropertyService
{
    Task<List<PropertyResponse>> GetAllAsync();
    Task<PropertyResponse?> GetByIdAsync(long id);
    Task<PropertyResponse> CreateAsync(PropertyCreateRequest request);
    Task<bool> UpdateAsync(long id, PropertyUpdateRequest request);
    Task<bool> DeleteAsync(long id, long? deletedBy);
}