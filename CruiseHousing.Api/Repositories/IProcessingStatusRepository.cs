using CruiseHousing.Api.Entities;

namespace CruiseHousing.Api.Repositories;

public interface IProcessingStatusRepository
{
    Task<List<ProcessingStatus>> GetAllActiveAsync();
    Task<ProcessingStatus?> GetByCodeAsync(string code);
}
