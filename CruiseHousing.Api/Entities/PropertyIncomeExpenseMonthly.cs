using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CruiseHousing.Api.Entities;

[Table("property_income_expense_monthly")]
public class PropertyIncomeExpenseMonthly
{
    [Key]
    [Column("id")]
    public long Id { get; set; }

    [Required]
    [Column("property_id")]
    public long PropertyId { get; set; }

    [Required]
    [MaxLength(6)]
    [MinLength(6)]
    [RegularExpression(@"^\d{6}$", ErrorMessage = "TargetYearMonth must be in YYYYMM format.")]
    [Column("target_year_month")]
    public string TargetYearMonth { get; set; } = string.Empty;

    [Range(typeof(decimal), "0", "999999999999999999")]
    [Column("expected_amount", TypeName = "decimal(18,0)")]
    public decimal ExpectedAmount { get; set; }

    [Range(typeof(decimal), "0", "999999999999999999")]
    [Column("management_company_amount", TypeName = "decimal(18,0)")]
    public decimal ManagementCompanyAmount { get; set; }

    [Required]
    [Column("executed_state")]
    public bool ExecutedState { get; set; }

    [Required]
    [Column("created_at")]
    public DateTime CreatedAt { get; set; }

    [Column("created_by")]
    public long? CreatedBy { get; set; }

    [Required]
    [Column("updated_at")]
    public DateTime UpdatedAt { get; set; }

    [Column("updated_by")]
    public long? UpdatedBy { get; set; }

    [Column("deleted_at")]
    public DateTime? DeletedAt { get; set; }

    [Column("deleted_by")]
    public long? DeletedBy { get; set; }

    [ForeignKey(nameof(PropertyId))]
    public Property? Property { get; set; }
}