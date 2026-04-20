using System.ComponentModel.DataAnnotations;

namespace CruiseHousing.Api.Dtos.PropertyIncomeExpenseMonthly;

public class PropertyIncomeExpenseMonthlyResponse
{
    public long Id { get; set; }
    public long PropertyId { get; set; }
    public string TargetYearMonth { get; set; } = string.Empty;
    public decimal ExpectedAmount { get; set; }
    public decimal ManagementCompanyAmount { get; set; }
    public bool ExecutedState { get; set; }
}