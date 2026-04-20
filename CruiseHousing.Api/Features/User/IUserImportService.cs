using CruiseHousing.Api.Entities;

namespace CruiseHousing.Api.Features.User;

public interface IUserImportService
{
    Task<Job> ImportCsvAsync(IFormFile file);
}