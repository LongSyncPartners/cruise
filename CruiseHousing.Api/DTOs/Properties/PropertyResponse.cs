using System.ComponentModel.DataAnnotations;

namespace CruiseHousing.Api.Dtos.Properties;

public class PropertyResponse
{
    public long Id { get; set; }
    public string PropertyCode { get; set; } = string.Empty;
    public string PropertyName { get; set; } = string.Empty;
    public string? PropertyAddress { get; set; }
    public string? ManagementTypeCode { get; set; }
    public string? PropertyTypeCode { get; set; }
    public long? ManagementCompanyId { get; set; }
    public DateOnly? ManagementStartDate { get; set; }
    public DateOnly? ManagementEndDate { get; set; }
    public DateOnly? ManagementDate { get; set; }
    public string? PropertyStatusCode { get; set; }
    public string? OwnerName { get; set; }
    public string? ProcessingStatusCode { get; set; }
}