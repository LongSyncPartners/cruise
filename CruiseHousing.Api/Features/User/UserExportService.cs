
using CruiseHousing.Api.Features.User.DTOs;
using CruiseHousing.Api.Repositories;
using System.Text;

namespace CruiseHousing.Api.Features.User;

/// <summary>
/// ユーザーCSVエクスポートサービス実装
/// </summary>
public class UserExportService: IUserExportService
{
    private readonly UserRepository _userRepository;
    private readonly ILogger<UserExportService> _logger;

    public UserExportService(
        UserRepository userRepository,
        ILogger<UserExportService> logger)
    {
        _userRepository = userRepository;
        _logger = logger;
    }

    /// <summary>
    /// ユーザー一覧CSVを出力する
    /// </summary>
    public async Task<(byte[] FileBytes, string FileName)> ExportCsvAsync(ExportUsersCsvRequestDto request)
    {
        _logger.LogInformation(
            "Start export users CSV UserName={UserName} UserEmail={UserEmail}",
            request.UserName,
            request.UserEmail);

        var users = await _userRepository.GetAllAsync();

        var sb = new StringBuilder();

        // header
        sb.AppendLine("user_id,user_name,user_email");

        foreach (var user in users)
        {
            sb.AppendLine(string.Join(",",
                EscapeCsv(user.UserId.ToString()),
                EscapeCsv(user.UserName),
                EscapeCsv(user.UserEmail)));
        }

        // UTF-8 with BOM 
        var utf8Bom = new UTF8Encoding(true);
        var fileBytes = utf8Bom.GetBytes(sb.ToString());

        var fileName = $"users_{DateTime.Now:yyyyMMddHHmmss}.csv";

        _logger.LogInformation(
            "Finish export users CSV Count={Count} FileName={FileName}",
            users.Count,
            fileName);

        return (fileBytes, fileName);
    }

    /// <summary>
    /// CSVエスケープ処理
    /// </summary>
    private static string EscapeCsv(string? value)
    {
        if (string.IsNullOrEmpty(value))
        {
            return string.Empty;
        }

        if (value.Contains(',') || value.Contains('"') || value.Contains('\n') || value.Contains('\r'))
        {
            return $"\"{value.Replace("\"", "\"\"")}\"";
        }

        return value;
    }
}