using CruiseHousing.Api.Entities;

namespace CruiseHousing.Api.Repositories;

public interface IPropertyTypeRepository
{
    Task<List<PropertyType>> GetAllActiveAsync();
    Task<PropertyType?> GetByCodeAsync(string code);
}