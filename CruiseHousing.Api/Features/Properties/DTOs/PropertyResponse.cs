using System.ComponentModel.DataAnnotations;

namespace CruiseHousing.Api.Features.Properties.DTOs;

public class PropertyResponse
{
    public long Id { get; set; }
    public string PropertyCode { get; set; } = string.Empty;
    public string PropertyName { get; set; } = string.Empty;
    public string? PropertyAddress { get; set; }
    public string? ManagementType { get; set; }
    public string? PropertyType { get; set; }
    public long? ManagementCompanyId { get; set; }
    public string? ManagementCompany { get; set; }
    public DateOnly? ManagementStartDate { get; set; }
    public DateOnly? ManagementEndDate { get; set; }
    public DateOnly? ManagementDate { get; set; }
    public string? PropertyStatus { get; set; }
    public string? OwnerName { get; set; }
    public string? ProcessingStatus { get; set; }
}