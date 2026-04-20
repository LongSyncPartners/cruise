using System.ComponentModel.DataAnnotations;

namespace CruiseHousing.Api.Features.PropertyIncomeExpenseDetails.DTOs;

public class PropertyIncomeExpenseMonthlyUpdateRequest
{
    public string TargetYearMonth { get; set; } = string.Empty;
    public decimal ExpectedAmount { get; set; }
    public decimal ManagementCompanyAmount { get; set; }
    public bool ExecutedState { get; set; }
    public long? UpdatedBy { get; set; }
}