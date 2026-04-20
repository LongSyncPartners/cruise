namespace CruiseHousing.Api.DTOs;

public class ErrorResponseDto
{
    public string ErrorCode { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public string? TraceId { get; set; }
    public IDictionary<string, string[]>? Errors { get; set; }
}