using CruiseHousing.Api.Features.User.DTOs;

namespace CruiseHousing.Api.Features.User;

public interface IUserExportService
{
    Task<(byte[] FileBytes, string FileName)> ExportCsvAsync(ExportUsersCsvRequestDto request);
}