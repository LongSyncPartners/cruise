using CruiseHousing.Api.Entities;

namespace CruiseHousing.Api.Repositories.Interfaces;

public interface IPropertyRepository
{
    Task<List<Property>> GetAllAsync();
    Task<Property?> GetByIdAsync(long id);
    Task<Property> AddAsync(Property entity);
    Task UpdateAsync(Property entity);
}