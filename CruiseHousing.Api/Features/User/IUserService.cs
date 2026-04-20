using CruiseHousing.Api.Features.User.DTOs;

namespace CruiseHousing.Api.Features.User;

public interface IUserService
{
    Task<List<UserDto>> GetAllAsync();

    Task<UserDto?> GetByIdAsync(long userId);

    Task<UserDto> CreateAsync(CreateUserDto dto);

    Task<UserDto?> UpdateAsync(long userId, UpdateUserDto dto);

    Task<bool> DeleteAsync(long userId);

    Task<bool> SoftDeleteAsync(long userId, string? updUserId = null, string? updUser = null);
}