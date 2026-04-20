using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CruiseHousing.Api.Entities;

[Table("properties")]
public class Property
{
    [Key]
    [Column("id")]
    public long Id { get; set; }

    [Required]
    [MaxLength(50)]
    [Column("property_code")]
    public string PropertyCode { get; set; } = string.Empty;

    [Required]
    [MaxLength(255)]
    [Column("property_name")]
    public string PropertyName { get; set; } = string.Empty;

    [MaxLength(500)]
    [Column("property_address")]
    public string? PropertyAddress { get; set; }

    [MaxLength(50)]
    [Column("management_type_code")]
    public string? ManagementTypeCode { get; set; }

    [MaxLength(50)]
    [Column("property_type_code")]
    public string? PropertyTypeCode { get; set; }

    [Column("management_company_id")]
    public long? ManagementCompanyId { get; set; }

    [Column("management_start_date")]
    public DateOnly? ManagementStartDate { get; set; }

    [Column("management_end_date")]
    public DateOnly? ManagementEndDate { get; set; }

    [Column("management_date")]
    public DateOnly? ManagementDate { get; set; }

    [MaxLength(50)]
    [Column("property_status_code")]
    public string? PropertyStatusCode { get; set; }

    [MaxLength(255)]
    [Column("owner_name")]
    public string? OwnerName { get; set; }

    [MaxLength(50)]
    [Column("processing_status_code")]
    public string? ProcessingStatusCode { get; set; }

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

    public ICollection<PropertyIncomeExpenseMonthly> MonthlyRecords { get; set; } =
        new List<PropertyIncomeExpenseMonthly>();

    public ICollection<PropertyIncomeExpenseDetail> DetailRecords { get; set; } =
        new List<PropertyIncomeExpenseDetail>();
}