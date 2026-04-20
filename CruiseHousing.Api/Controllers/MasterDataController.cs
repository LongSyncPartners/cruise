using CruiseHousing.Api.Features.Masters.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace CruiseHousing.Api.Features.Masters;

[ApiController]
[Route("api/master-data")]
public class MasterDataController : ControllerBase
{
    private readonly IMasterDataService _masterDataService;

    public MasterDataController(IMasterDataService masterDataService)
    {
        _masterDataService = masterDataService;
    }

    /// <summary>
    /// 物件画面用マスタデータ取得
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(Dictionary<string, List<MasterItemDto>>), StatusCodes.Status200OK)]
    public async Task<IActionResult> Get([FromQuery] string? types)
    {
        var result = await _masterDataService.GetAsync(types);
        return Ok(result);
    }
}