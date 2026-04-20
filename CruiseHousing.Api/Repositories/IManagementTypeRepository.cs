using CruiseHousing.Api.Entities;

namespace CruiseHousing.Api.Repositories;

public interface IManagementTypeRepository
{
    Task<List<ManagementType>> GetAllActiveAsync();
    Task<ManagementType?> GetByCodeAsync(string code);
}
