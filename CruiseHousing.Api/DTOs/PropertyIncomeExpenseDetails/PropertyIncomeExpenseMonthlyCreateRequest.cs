using System.ComponentModel.DataAnnotations;

namespace CruiseHousing.Api.Dtos.PropertyIncomeExpenseMonthly;

public class PropertyIncomeExpenseMonthlyCreateRequest
{
    [Required]
    public long PropertyId { get; set; }

    [Required]
    [StringLength(6, MinimumLength = 6)]
    [RegularExpression(@"^\d{6}$", ErrorMessage = "TargetYearMonth must be in YYYYMM format.")]
    public string TargetYearMonth { get; set; } = string.Empty;

    [Range(typeof(decimal), "0", "999999999999999999")]
    public decimal ExpectedAmount { get; set; }

    [Range(typeof(decimal), "0", "999999999999999999")]
    public decimal ManagementCompanyAmount { get; set; }

    public bool ExecutedState { get; set; }

    public long? CreatedBy { get; set; }
}