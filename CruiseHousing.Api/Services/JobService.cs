using CruiseHousing.Api.Constants;
using CruiseHousing.Api.DTOs;
using CruiseHousing.Api.Entities;
using CruiseHousing.Api.Exceptions;
using CruiseHousing.Api.Repositories;
using CruiseHousing.Api.Security;

namespace CruiseHousing.Api.Services;

public class JobService
{
    private readonly JobRepository _jobRepository;
    private readonly CurrentUser _currentUser;
    private readonly ILogger<JobService> _logger;

    public JobService(
        JobRepository jobRepository,
        CurrentUser currentUser,
        ILogger<JobService> logger)
    {
        _jobRepository = jobRepository;
        _currentUser = currentUser;
        _logger = logger;
    }

    public async Task<JobStatusResponse> GetByIdAsync(long jobId)
    {
        var job = await _jobRepository.GetByIdAsync(jobId);
        if (job == null)
        {
            throw new NotFoundException("ジョブが存在しません。");
        }

        return new JobStatusResponse()
        {
            JobId = jobId,
            Status = job.Status,
            ErrorMessage = job.ErrorMessage,
            DownloadUrl = string.IsNullOrEmpty(job.OutputFilePath) ? null : $"/api/jobs/{jobId}/download"
        };
    }

    public async Task<List<Job>> GetAllAsync()
    {
        return await _jobRepository.GetAllAsync();
    }

    public async Task<List<Job>> GetByRequestedByAsync(long requestedBy)
    {
        return await _jobRepository.GetByRequestedByAsync(requestedBy);
    }

    public async Task<Job> CreateAsync(Job job)
    {
        job.CreatedAt = DateTime.Now;

        _logger.LogInformation(
            "Create job JobType={JobType} RequestedBy={RequestedBy}",
            job.JobType,
            job.RequestedBy);

        await _jobRepository.AddAsync(job);
        await _jobRepository.SaveChangesAsync();

        return job;
    }

    public async Task<Job> CreateUserImportAsync(string fileName, string inputFilePath)
    {
        var job = new Job
        {
            JobType = JobTypes.Import,                 // ジョブ種類
            TargetType = TargetType.User,              // 対象データ種類
            Status = JobStatuses.Pending,              // 未開始
            FileName = fileName,
            InputFilePath = inputFilePath,
            RequestedBy = _currentUser.UserId,         // ジョブをリクエストしたユーザーID
            TotalRows = 0,                            // 処理対象の総行数
            SuccessRows = 0,                          // 成功した行数
            FailedRows = 0,                           // 失敗した行数
            CreatedAt = DateTime.UtcNow,               // 作成日時
            UpdatedAt = DateTime.UtcNow,               // 更新日時
        };

        _logger.LogInformation(
            "Create job JobType={JobType} Status={Status}",
            job.JobType,
            job.Status);

        await _jobRepository.AddAsync(job);
        await _jobRepository.SaveChangesAsync();

        return job;
    }

    public async Task<Job> UpdateAsync(Job job)
    {
        var existing = await _jobRepository.GetByIdAsync(job.JobId);
        if (existing == null)
        {
            throw new NotFoundException("ジョブが存在しません。");
        }

        existing.JobType = job.JobType;
        existing.RequestedBy = job.RequestedBy;
        existing.FileName = job.FileName;
        existing.InputFilePath = job.InputFilePath;
        existing.OutputFilePath = job.OutputFilePath;
        existing.FilterJson = job.FilterJson;
        existing.ErrorMessage = job.ErrorMessage;
        existing.FailedRows = job.FailedRows;
        existing.StartedAt = job.StartedAt;
        existing.CompletedAt = job.CompletedAt;

        await _jobRepository.UpdateAsync(existing);
        await _jobRepository.SaveChangesAsync();

        return existing;
    }

    public async Task DeleteAsync(long jobId)
    {
        var existing = await _jobRepository.GetByIdAsync(jobId);
        if (existing == null)
        {
            throw new NotFoundException("ジョブが存在しません。");
        }

        await _jobRepository.DeleteAsync(existing);
        await _jobRepository.SaveChangesAsync();
    }
}