using CruiseHousing.Api.Constants;
using CruiseHousing.Api.Exceptions;
using CruiseHousing.Api.Models;
using CruiseHousing.Api.RabbitMQ;
using CruiseHousing.Api.Repositories;
using CruiseHousing.Api.Security;

namespace CruiseHousing.Api.Services;

/// <summary>
/// ユーザーCSVインポートサービス実装
/// </summary>
public class UserImportService
{
    private readonly JobQueuePublisher _obQueuePublisher;
    private readonly JobService _jobService;
    private readonly ILogger<UserImportService> _logger;

    public UserImportService(
        JobQueuePublisher jobQueuePublisher,
        JobService jobService,
        ILogger<UserImportService> logger)
    {
        _obQueuePublisher = jobQueuePublisher;
        _jobService = jobService;
        _logger = logger;
    }

    /// <summary>
    /// CSVファイルからユーザーをインポートする
    /// </summary>
    public async Task<Job> ImportCsvAsync(IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            throw new BusinessException("CSVファイルが選択されていません。");
        }

        var folderPath = Path.Combine(
            Directory.GetCurrentDirectory(),
            "storage",
            "import",
            "users");

        if (!Directory.Exists(folderPath))
        {
            Directory.CreateDirectory(folderPath);
        }

        var fileName = $"{Guid.NewGuid()}_{file.FileName}";

        var filePath = Path.Combine(folderPath, fileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        _logger.LogInformation(
            "User CSV uploaded FileName={FileName} Path={Path}",
            fileName,
            filePath);

        var job = await _jobService.CreateUserImportAsync(fileName, filePath);
        await _obQueuePublisher.PublishAsync(new ImportUserJobMessage() { JobId = job.JobId});

        return job;
    }
}