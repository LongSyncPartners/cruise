using CruiseHousing.Api.Entities;

namespace CruiseHousing.Api.Repositories;

public interface IPropertyStatusRepository
{
    Task<List<PropertyStatus>> GetAllActiveAsync();
    Task<PropertyStatus?> GetByCodeAsync(string code);
}
