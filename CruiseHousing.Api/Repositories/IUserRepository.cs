using CruiseHousing.Api.Entities;

namespace CruiseHousing.Api.Repositories;

public interface IUserRepository
{
    Task<List<User>> GetAllAsync();

    Task<User?> GetByIdAsync(long id);

    Task<User?> GetByEmailAsync(string email);

    Task<User?> GetByLoginIdAsync(string loginId);

    Task<User?> GetByLoginIdOrEmailAsync(string loginIdOrEmail);

    Task<User> CreateAsync(User entity);

    Task<User?> UpdateAsync(User entity);

    Task<bool> DeleteAsync(long id);

    Task<bool> SoftDeleteAsync(long id, string? updatedBy = null);
}