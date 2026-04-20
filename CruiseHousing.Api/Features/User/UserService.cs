using CruiseHousing.Api.Messages;
using CruiseHousing.Api.Exceptions;
using CruiseHousing.Api.Mappers;
using CruiseHousing.Api.Repositories;
using CruiseHousing.Api.Features.User.DTOs;

namespace CruiseHousing.Api.Features.User
{
    /// <summary>
    /// User業務処理用Service
    /// </summary>
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        /// <summary>
        /// コンストラクタ
        /// </summary>
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        /// <summary>
        /// ユーザー一覧取得
        /// </summary>
        public async Task<List<UserDto>> GetAllAsync()
        {
            var users = await _userRepository.GetAllAsync();
            return users.Select(UserMapper.ToDto).ToList();
        }

        /// <summary>
        /// IDでユーザー取得
        /// </summary>
        public async Task<UserDto?> GetByIdAsync(long userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
            {
                throw new NotFoundException("ユーザーが存在しません。");
            }

            return UserMapper.ToDto(user);
        }

        /// <summary>
        /// ユーザー新規登録
        /// </summary>
        public async Task<UserDto> CreateAsync(CreateUserDto dto)
        {
            var exists = await _userRepository.GetByEmailAsync(dto.Email ?? string.Empty);
            if (exists != null)
            {
                throw new Exceptions.BusinessException(ErrorMessages.EmailAlreadyExists);
            }

            var entity = UserMapper.ToEntity(dto);
            entity.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);
            var created = await _userRepository.CreateAsync(entity);

            return UserMapper.ToDto(created);
        }

        /// <summary>
        /// ユーザー更新
        /// </summary>
        public async Task<UserDto?> UpdateAsync(long userId, UpdateUserDto dto)
        {
            var existing = await _userRepository.GetByIdAsync(userId);
            if (existing == null)
            {
                throw new NotFoundException("対象ユーザーが存在しません。");
            }

            UserMapper.ApplyUpdate(existing, dto);
            var updated = await _userRepository.UpdateAsync(existing);

            if (updated == null)
            {
                throw new NotFoundException("対象ユーザーが存在しません。");
            }

            return UserMapper.ToDto(updated);
        }

        /// <summary>
        /// ユーザー物理削除
        /// </summary>
        public async Task<bool> DeleteAsync(long userId)
        {
            return await _userRepository.DeleteAsync(userId);
        }

        /// <summary>
        /// ユーザー論理削除
        /// </summary>
        public async Task<bool> SoftDeleteAsync(long userId, string? updUserId = null, string? updUser = null)
        {
            return await _userRepository.SoftDeleteAsync(userId);
        }
    }
}