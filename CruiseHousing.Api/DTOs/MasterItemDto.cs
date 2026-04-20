namespace CruiseHousing.Api.Features.Masters.DTOs;

/// <summary>
/// マスタ項目DTO
/// </summary>
public class MasterItemDto
{
    /// <summary>
    /// 値
    /// </summary>
    public string Value { get; set; } = string.Empty;

    /// <summary>
    /// 表示名
    /// </summary>
    public string Label { get; set; } = string.Empty;
}