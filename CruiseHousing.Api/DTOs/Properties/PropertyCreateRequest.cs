using System.ComponentModel.DataAnnotations;

namespace CruiseHousing.Api.Dtos.Properties;

public class PropertyCreateRequest
{
    [Required]
    [MaxLength(50)]
    public string PropertyCode { get; set; } = string.Empty;

    [Required]
    [MaxLength(255)]
    public string PropertyName { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? PropertyAddress { get; set; }

    [MaxLength(50)]
    public string? ManagementTypeCode { get; set; }

    [MaxLength(50)]
    public string? PropertyTypeCode { get; set; }

    public long? ManagementCompanyId { get; set; }

    public DateOnly? ManagementStartDate { get; set; }
    public DateOnly? ManagementEndDate { get; set; }
    public DateOnly? ManagementDate { get; set; }

    [MaxLength(50)]
    public string? PropertyStatusCode { get; set; }

    [MaxLength(255)]
    public string? OwnerName { get; set; }

    [MaxLength(50)]
    public string? ProcessingStatusCode { get; set; }

    public long? CreatedBy { get; set; }
}