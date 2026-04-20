using CruiseHousing.Api.Entities;
using CruiseHousing.Api.Features.PropertyIncomeExpenseDetails.DTOs;
using CruiseHousing.Api.Repositories.Interfaces;

namespace CruiseHousing.Api.Features.PropertyIncomeExpenseDetails;

public class PropertyIncomeExpenseMonthlyService : IPropertyIncomeExpenseMonthlyService
{
    private readonly IPropertyIncomeExpenseMonthlyRepository _repository;

    public PropertyIncomeExpenseMonthlyService(IPropertyIncomeExpenseMonthlyRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<PropertyIncomeExpenseMonthlyResponse>> GetAllAsync()
    {
        var entities = await _repository.GetAllAsync();
        return entities.Select(MapToResponse).ToList();
    }

    public async Task<List<PropertyIncomeExpenseMonthlyResponse>> GetByPropertyIdAsync(long propertyId)
    {
        var entities = await _repository.GetByPropertyIdAsync(propertyId);
        return entities.Select(MapToResponse).ToList();
    }

    public async Task<PropertyIncomeExpenseMonthlyResponse?> GetByIdAsync(long id)
    {
        var entity = await _repository.GetByIdAsync(id);
        return entity == null ? null : MapToResponse(entity);
    }

    public async Task<PropertyIncomeExpenseMonthlyResponse> CreateAsync(PropertyIncomeExpenseMonthlyCreateRequest request)
    {
        var now = DateTime.UtcNow;

        var entity = new PropertyIncomeExpenseMonthly
        {
            PropertyId = request.PropertyId,
            TargetYearMonth = request.TargetYearMonth,
            ExpectedAmount = request.ExpectedAmount,
            ManagementCompanyAmount = request.ManagementCompanyAmount,
            ExecutedState = request.ExecutedState,
            CreatedAt = now,
            CreatedBy = request.CreatedBy,
            UpdatedAt = now,
            UpdatedBy = request.CreatedBy
        };

        await _repository.AddAsync(entity);
        return MapToResponse(entity);
    }

    public async Task<bool> UpdateAsync(long id, PropertyIncomeExpenseMonthlyUpdateRequest request)
    {
        var entity = await _repository.GetByIdAsync(id);
        if (entity == null) return false;

        entity.TargetYearMonth = request.TargetYearMonth;
        entity.ExpectedAmount = request.ExpectedAmount;
        entity.ManagementCompanyAmount = request.ManagementCompanyAmount;
        entity.ExecutedState = request.ExecutedState;
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

    private static PropertyIncomeExpenseMonthlyResponse MapToResponse(PropertyIncomeExpenseMonthly entity)
    {
        return new PropertyIncomeExpenseMonthlyResponse
        {
            Id = entity.Id,
            PropertyId = entity.PropertyId,
            TargetYearMonth = entity.TargetYearMonth,
            ExpectedAmount = entity.ExpectedAmount,
            ManagementCompanyAmount = entity.ManagementCompanyAmount,
            ExecutedState = entity.ExecutedState
        };
    }
}