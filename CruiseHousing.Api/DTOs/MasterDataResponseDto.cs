namespace CruiseHousing.Api.Features.Masters.DTOs;

/// <summary>
/// マスタデータ返却DTO
/// </summary>
public class MasterDataResponseDto
{
    /// <summary>
    /// 管理形態
    /// </summary>
    public List<MasterItemDto> ManagementType { get; set; } = [];

    /// <summary>
    /// 処理状況
    /// </summary>
    public List<MasterItemDto> ProcessingStatus { get; set; } = [];

    /// <summary>
    /// 物件状態
    /// </summary>
    public List<MasterItemDto> PropertyStatus { get; set; } = [];

    /// <summary>
    /// 物件種別
    /// </summary>
    public List<MasterItemDto> PropertyType { get; set; } = [];
}