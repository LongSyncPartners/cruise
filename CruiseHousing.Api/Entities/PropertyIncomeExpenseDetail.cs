using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CruiseHousing.Api.Entities;

[Table("property_income_expense_details")]
public class PropertyIncomeExpenseDetail
{
    [Key]
    [Column("id")]
    public long Id { get; set; }

    [Required]
    [Column("property_id")]
    public long PropertyId { get; set; }

    [Required]
    [Column("transaction_date")]
    public DateOnly TransactionDate { get; set; }

    [MaxLength(255)]
    [Column("counterparty")]
    public string? Counterparty { get; set; }

    [MaxLength(500)]
    [Column("description")]
    public string? Description { get; set; }

    [Range(typeof(decimal), "0", "999999999999999999")]
    [Column("income_amount", TypeName = "decimal(18,0)")]
    public decimal IncomeAmount { get; set; }

    [Range(typeof(decimal), "0", "999999999999999999")]
    [Column("expense_amount", TypeName = "decimal(18,0)")]
    public decimal ExpenseAmount { get; set; }

    [Range(typeof(decimal), "-999999999999999999", "999999999999999999")]
    [Column("balance_amount", TypeName = "decimal(18,0)")]
    public decimal BalanceAmount { get; set; }

    [Column("note")]
    public string? Note { get; set; }

    [Range(0, int.MaxValue)]
    [Column("display_order")]
    public int DisplayOrder { get; set; }

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