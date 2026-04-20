using CruiseHousing.Api.Entities;
using CruiseHousing.Api.Features.Properties.DTOs;
using CruiseHousing.Api.Repositories.Interfaces;

namespace CruiseHousing.Api.Features.Properties;

public class PropertyService : IPropertyService
{
    private readonly IPropertyRepository _repository;

    public PropertyService(IPropertyRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<PropertyResponse>> GetAllAsync()
    {
        var entities = await _repository.GetAllAsync();
        return entities.Select(MapToResponse).ToList();
    }

    public async Task<PropertyResponse?> GetByIdAsync(long id)
    {
        var entity = await _repository.GetByIdAsync(id);
        return entity == null ? null : MapToResponse(entity);
    }

    public async Task<PropertyResponse> CreateAsync(PropertyCreateRequest request)
    {
        var now = DateTime.UtcNow;

        var entity = new Property
        {
            PropertyCode = request.PropertyCode,
            PropertyName = request.PropertyName,
            PropertyAddress = request.PropertyAddress,
            ManagementTypeCode = request.ManagementTypeCode,
            PropertyTypeCode = request.PropertyTypeCode,
            ManagementCompanyId = request.ManagementCompanyId,
            ManagementStartDate = request.ManagementStartDate,
            ManagementEndDate = request.ManagementEndDate,
            ManagementDate = request.ManagementDate,
            PropertyStatusCode = request.PropertyStatusCode,
            OwnerName = request.OwnerName,
            ProcessingStatusCode = request.ProcessingStatusCode,
            CreatedAt = now,
            CreatedBy = request.CreatedBy,
            UpdatedAt = now,
            UpdatedBy = request.CreatedBy
        };

        await _repository.AddAsync(entity);
        return MapToResponse(entity);
    }

    public async Task<bool> UpdateAsync(long id, PropertyUpdateRequest request)
    {
        var entity = await _repository.GetByIdAsync(id);
        if (entity == null) return false;

        entity.PropertyCode = request.PropertyCode;
        entity.PropertyName = request.PropertyName;
        entity.PropertyAddress = request.PropertyAddress;
        entity.ManagementTypeCode = request.ManagementTypeCode;
        entity.PropertyTypeCode = request.PropertyTypeCode;
        entity.ManagementCompanyId = request.ManagementCompanyId;
        entity.ManagementStartDate = request.ManagementStartDate;
        entity.ManagementEndDate = request.ManagementEndDate;
        entity.ManagementDate = request.ManagementDate;
        entity.PropertyStatusCode = request.PropertyStatusCode;
        entity.OwnerName = request.OwnerName;
        entity.ProcessingStatusCode = request.ProcessingStatusCode;
        entity.UpdatedAt = DateTime.UtcNow;
        entity.UpdatedBy = request.UpdatedBy;

        await _repository.UpdateAsync(entity);
        return true;
    }

    public async Task<bool> DeleteAsync(long id, long? deletedBy)
    {
        var entity = await _repository.GetByIdAsync(id);
        if (entity == null) return false;

        entity.DeletedAt = DateTime.UtcNow;
        entity.DeletedBy = deletedBy;
        entity.UpdatedAt = DateTime.UtcNow;
        entity.UpdatedBy = deletedBy;

        await _repository.UpdateAsync(entity);
        return true;
    }

    private static PropertyResponse MapToResponse(Property entity)
    {
        return new PropertyResponse
        {
            Id = entity.Id,
            PropertyCode = entity.PropertyCode,
            PropertyName = entity.PropertyName,
            PropertyAddress = entity.PropertyAddress,
            ManagementType = entity.ManagementTypeCode,
            PropertyType = entity.PropertyTypeCode,
            ManagementCompany = entity.ManagementCompanyId?.ToString(),
            ManagementStartDate = entity.ManagementStartDate,
            ManagementEndDate = entity.ManagementEndDate,
            ManagementDate = entity.ManagementDate,
            PropertyStatus = entity.PropertyStatusCode,
            OwnerName = entity.OwnerName,
            ProcessingStatus = entity.ProcessingStatusCode
        };
    }
}