using CruiseHousing.Api.Features.Masters.DTOs;

namespace CruiseHousing.Api.Features.Masters;

public interface IMasterDataService
{
    /// <summary>
    /// マスタデータ取得（動的）
    /// </summary>
    /// <param name="types">取得するマスタ種別（カンマ区切り）</param>
    Task<Dictionary<string, List<MasterItemDto>>> GetAsync(string? types);
}