using CruiseHousing.Api.Dtos.PropertyIncomeExpenseDetails;
using CruiseHousing.Api.Entities;
using CruiseHousing.Api.Repositories.Interfaces;
using CruiseHousing.Api.Services.Interfaces;

namespace CruiseHousing.Api.Services.Implementations;

public class PropertyIncomeExpenseDetailService : IPropertyIncomeExpenseDetailService
{
    private readonly IPropertyIncomeExpenseDetailRepository _repository;

    public PropertyIncomeExpenseDetailService(IPropertyIncomeExpenseDetailRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<PropertyIncomeExpenseDetailResponse>> GetAllAsync()
    {
        var entities = await _repository.GetAllAsync();
        return entities.Select(MapToResponse).ToList();
    }

    public async Task<List<PropertyIncomeExpenseDetailResponse>> GetByPropertyIdAsync(long propertyId)
    {
        var entities = await _repository.GetByPropertyIdAsync(propertyId);
        return entities.Select(MapToResponse).ToList();
    }

    public async Task<PropertyIncomeExpenseDetailResponse?> GetByIdAsync(long id)
    {
        var entity = await _repository.GetByIdAsync(id);
        return entity == null ? null : MapToResponse(entity);
    }

    public async Task<PropertyIncomeExpenseDetailResponse> CreateAsync(PropertyIncomeExpenseDetailCreateRequest request)
    {
        var now = DateTime.UtcNow;

        var entity = new PropertyIncomeExpenseDetail
        {
            PropertyId = request.PropertyId,
            TransactionDate = request.TransactionDate,
            Counterparty = request.Counterparty,
            Description = request.Description,
            IncomeAmount = request.IncomeAmount,
            ExpenseAmount = request.ExpenseAmount,
            BalanceAmount = request.BalanceAmount,
            Note = request.Note,
            DisplayOrder = request.DisplayOrder,
            CreatedAt = now,
            CreatedBy = request.CreatedBy,
            UpdatedAt = now,
            UpdatedBy = request.CreatedBy
        };

        await _repository.AddAsync(entity);
        return MapToResponse(entity);
    }

    public async Task<bool> UpdateAsync(long id, PropertyIncomeExpenseDetailUpdateRequest request)
    {
        var entity = await _repository.GetByIdAsync(id);
        if (entity == null) return false;

        entity.TransactionDate = request.TransactionDate;
        entity.Counterparty = request.Counterparty;
        entity.Description = request.Description;
        entity.IncomeAmount = request.IncomeAmount;
        entity.ExpenseAmount = request.ExpenseAmount;
        entity.BalanceAmount = request.BalanceAmount;
        entity.Note = request.Note;
        entity.DisplayOrder = request.DisplayOrder;
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

    private static PropertyIncomeExpenseDetailResponse MapToResponse(PropertyIncomeExpenseDetail entity)
    {
        return new PropertyIncomeExpenseDetailResponse
        {
            Id = entity.Id,
            PropertyId = entity.PropertyId,
            TransactionDate = entity.TransactionDate,
            Counterparty = entity.Counterparty,
            Description = entity.Description,
            IncomeAmount = entity.IncomeAmount,
            ExpenseAmount = entity.ExpenseAmount,
            BalanceAmount = entity.BalanceAmount,
            Note = entity.Note,
            DisplayOrder = entity.DisplayOrder
        };
    }
}