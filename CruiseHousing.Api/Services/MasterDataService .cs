using CruiseHousing.Api.Constants;
using CruiseHousing.Api.Entities;
using CruiseHousing.Api.Features.Masters.DTOs;
using CruiseHousing.Api.Repositories;

namespace CruiseHousing.Api.Features.Masters;

public class MasterDataService : IMasterDataService
{
    private readonly IManagementTypeRepository _managementTypeRepository;
    private readonly IProcessingStatusRepository _processingStatusRepository;
    private readonly IPropertyStatusRepository _propertyStatusRepository;
    private readonly IPropertyTypeRepository _propertyTypeRepository;

    public MasterDataService(
        IManagementTypeRepository managementTypeRepository,
        IProcessingStatusRepository processingStatusRepository,
        IPropertyStatusRepository propertyStatusRepository,
        IPropertyTypeRepository propertyTypeRepository)
    {
        _managementTypeRepository = managementTypeRepository;
        _processingStatusRepository = processingStatusRepository;
        _propertyStatusRepository = propertyStatusRepository;
        _propertyTypeRepository = propertyTypeRepository;
    }

    public async Task<Dictionary<string, List<MasterItemDto>>> GetAsync(string? types)
    {
        var result = new Dictionary<string, List<MasterItemDto>>();

        var typeList = string.IsNullOrWhiteSpace(types)
            ? new List<string>()
            : types.Split(',', StringSplitOptions.RemoveEmptyEntries)
                   .Select(x => x.Trim())
                   .ToList();

        if (typeList.Contains(MasterTypes.ManagementType))
        {
            var data = await _managementTypeRepository.GetAllActiveAsync();
            result["managementType"] = data.Select(x => new MasterItemDto
            {
                Value = x.Code,
                Label = x.Name
            }).ToList();
        }

        if (typeList.Contains(MasterTypes.ProcessingStatus))
        {
            var data = await _processingStatusRepository.GetAllActiveAsync();
            result["processingStatus"] = data.Select(x => new MasterItemDto
            {
                Value = x.Code,
                Label = x.Name
            }).ToList();
        }

        if (typeList.Contains(MasterTypes.PropertyStatus))
        {
            var data = await _propertyStatusRepository.GetAllActiveAsync();
            result["propertyStatus"] = data.Select(x => new MasterItemDto
            {
                Value = x.Code,
                Label = x.Name
            }).ToList();
        }

        if (typeList.Contains(MasterTypes.PropertyType))
        {
            var data = await _propertyTypeRepository.GetAllActiveAsync();
            result["propertyType"] = data.Select(x => new MasterItemDto
            {
                Value = x.Code,
                Label = x.Name
            }).ToList();
        }

        return result;
    }
}