using CruiseHousing.Api.Entities;
using CruiseHousing.Api.Features.User.DTOs;

namespace CruiseHousing.Api.Mappers;

/// <summary>
/// UserエンティティとDTOの変換処理
/// </summary>
public static class UserMapper
{
    /// <summary>
    /// Entity → DTO変換
    /// </summary>
    public static UserDto ToDto(User entity)
    {
        return new UserDto
        {
            Id = entity.Id,
            LoginId = entity.LoginId,
            UserName = entity.UserName,
            Email = entity.Email,
            RoleId = entity.RoleId,
            RoleName = entity.Role?.Name,
            IsActive = entity.IsActive,
            CreatedAt = entity.CreatedAt,
            UpdatedAt = entity.UpdatedAt
        };
    }

    /// <summary>
    /// CreateDto → Entity変換
    /// </summary>
    public static User ToEntity(CreateUserDto dto)
    {
        return new User
        {
            LoginId = dto.LoginId,
            UserName = dto.UserName,
            Email = dto.Email,
            PasswordHash = dto.PasswordHash,
            RoleId = dto.RoleId,
            IsActive = dto.IsActive,
            CreatedBy = dto.CreatedBy,
            UpdatedBy = dto.CreatedBy,
            CreatedAt = DateTime.Now,
            UpdatedAt = DateTime.Now
        };
    }

    /// <summary>
    /// UpdateDtoの内容をEntityへ反映
    /// </summary>
    public static void ApplyUpdate(User entity, UpdateUserDto dto)
    {
        entity.LoginId = dto.LoginId;
        entity.UserName = dto.UserName;
        entity.Email = dto.Email;
        entity.RoleId = dto.RoleId;
        entity.IsActive = dto.IsActive;
        entity.UpdatedBy = dto.UpdatedBy;
        entity.UpdatedAt = DateTime.Now;

        if (!string.IsNullOrWhiteSpace(dto.PasswordHash))
        {
            entity.PasswordHash = dto.PasswordHash;
        }
    }
}