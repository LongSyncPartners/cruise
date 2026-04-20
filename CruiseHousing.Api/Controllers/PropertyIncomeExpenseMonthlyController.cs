using CruiseHousing.Api.Dtos.PropertyIncomeExpenseMonthly;
using CruiseHousing.Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CruiseHousing.Api.Controllers;

[ApiController]
[Route("api/property-income-expense-monthly")]
public class PropertyIncomeExpenseMonthlyController : ControllerBase
{
    private readonly IPropertyIncomeExpenseMonthlyService _service;

    public PropertyIncomeExpenseMonthlyController(IPropertyIncomeExpenseMonthlyService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<List<PropertyIncomeExpenseMonthlyResponse>>> GetAll()
    {
        return Ok(await _service.GetAllAsync());
    }

    [HttpGet("property/{propertyId:long}")]
    public async Task<ActionResult<List<PropertyIncomeExpenseMonthlyResponse>>> GetByPropertyId(long propertyId)
    {
        return Ok(await _service.GetByPropertyIdAsync(propertyId));
    }

    [HttpGet("{id:long}")]
    public async Task<ActionResult<PropertyIncomeExpenseMonthlyResponse>> GetById(long id)
    {
        var result = await _service.GetByIdAsync(id);
        if (result == null) return NotFound();
        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<PropertyIncomeExpenseMonthlyResponse>> Create(
        [FromBody] PropertyIncomeExpenseMonthlyCreateRequest request)
    {
        var result = await _service.CreateAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpPut("{id:long}")]
    public async Task<IActionResult> Update(long id, [FromBody] PropertyIncomeExpenseMonthlyUpdateRequest request)
    {
        var updated = await _service.UpdateAsync(id, request);
        if (!updated) return NotFound();
        return NoContent();
    }

    [HttpDelete("{id:long}")]
    public async Task<IActionResult> Delete(long id, [FromQuery] long? deletedBy)
    {
        var deleted = await _service.DeleteAsync(id, deletedBy);
        if (!deleted) return NotFound();
        return NoContent();
    }
}