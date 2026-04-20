using CruiseHousing.Api.Entities;
using CruiseHousing.Api.Features.User.DTOs;

namespace CruiseHousing.Api.Mappers
{
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
                UserId = entity.UserId,
                UserName = entity.UserName,
                UserEmail = entity.UserEmail,
                UserRole = entity.UserRole,
                AddDate = entity.AddDate,
                UpdDate = entity.UpdDate
            };
        }

        /// <summary>
        /// CreateDto → Entity変換
        /// </summary>
        public static User ToEntity(CreateUserDto dto)
        {
            return new User
            {
                UserName = dto.UserName,
                UserEmail = dto.UserEmail,
                UserRole = dto.UserRole,
                DelFlg = "0",
                DelDate = null,
                RegUserid = dto.RegUserid,
                RegUser = dto.RegUser,
                AddDate = DateTime.Now,
                UpdUserId = dto.RegUserid,
                UpdUser = dto.RegUser,
                UpdDate = DateTime.Now
            };
        }

        /// <summary>
        /// UpdateDtoの内容をEntityへ反映
        /// </summary>
        public static void ApplyUpdate(User entity, UpdateUserDto dto)
        {
            entity.UserName = dto.UserName;
            entity.UserEmail = dto.UserEmail;
            entity.UserRole = dto.UserRole;
            entity.UpdUserId = dto.UpdUserId;
            entity.UpdUser = dto.UpdUser;
            entity.UpdDate = DateTime.Now;
        }
    }
}