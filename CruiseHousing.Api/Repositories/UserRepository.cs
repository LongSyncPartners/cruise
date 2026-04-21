using CruiseHousing.Api.Data;
using CruiseHousing.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace CruiseHousing.Api.Repositories;

/// <summary>
/// UserテーブルRepository実装
/// </summary>
public class UserRepository : IUserRepository
{
    private readonly AppDbContext _dbContext;

    /// <summary>
    /// コンストラクタ
    /// </summary>
    public UserRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    /// <summary>
    /// ユーザー一覧取得
    /// 論理削除されていないデータのみ取得
    /// </summary>
    public async Task<List<User>> GetAllAsync()
    {
        return await _dbContext.Users
            .Include(x => x.Role)
            .AsNoTracking()
            .Where(x => x.DeletedAt == null)
            .OrderByDescending(x => x.Id)
            .ToListAsync();
    }

    /// <summary>
    /// IDでユーザー取得
    /// </summary>
    public async Task<User?> GetByIdAsync(long id)
    {
        return await _dbContext.Users
            .Include(x => x.Role)
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == id && x.DeletedAt == null);
    }

    /// <summary>
    /// メールアドレスでユーザー取得
    /// </summary>
    public async Task<User?> GetByEmailAsync(string email)
    {
        return await _dbContext.Users
            .Include(x => x.Role)
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Email == email && x.DeletedAt == null);
    }

    /// <summary>
    /// ログインIDでユーザー取得
    /// </summary>
    public async Task<User?> GetByLoginIdAsync(string loginId)
    {
        return await _dbContext.Users
            .Include(x => x.Role)
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.LoginId == loginId && x.DeletedAt == null);
    }

    /// <summary>
    /// ログインID又はメールアドレスでユーザー取得
    /// </summary>
    public async Task<User?> GetByLoginIdOrEmailAsync(string loginIdOrEmail)
    {
        var isEmail = loginIdOrEmail.Contains("@");

        return await _dbContext.Users
            .AsNoTracking()
            .Where(x => x.DeletedAt == null)
            .Where(x => isEmail
                ? x.Email == loginIdOrEmail
                : x.LoginId == loginIdOrEmail)
             .Select(x => new User
             {
                 Email = x.Email,
                 UserName = x.UserName,
             })
            .FirstOrDefaultAsync();
    }


    /// <summary>
    /// ユーザー新規登録
    /// </summary>
    public async Task<User> CreateAsync(User entity)
    {
        entity.CreatedAt = DateTime.Now;
        entity.UpdatedAt = DateTime.Now;

        await _dbContext.Users.AddAsync(entity);
        await _dbContext.SaveChangesAsync();
        return entity;
    }

    /// <summary>
    /// ユーザー更新
    /// </summary>
    public async Task<User?> UpdateAsync(User entity)
    {
        var existing = await _dbContext.Users
            .FirstOrDefaultAsync(x => x.Id == entity.Id && x.DeletedAt == null);

        if (existing == null)
        {
            return null;
        }

        existing.LoginId = entity.LoginId;
        existing.UserName = entity.UserName;
        existing.Email = entity.Email;
        existing.PasswordHash = entity.PasswordHash;
        existing.RoleId = entity.RoleId;
        existing.IsActive = entity.IsActive;
        existing.UpdatedBy = entity.UpdatedBy;
        existing.UpdatedAt = DateTime.Now;

        await _dbContext.SaveChangesAsync();
        return existing;
    }

    /// <summary>
    /// ユーザー物理削除
    /// </summary>
    public async Task<bool> DeleteAsync(long id)
    {
        var existing = await _dbContext.Users
            .FirstOrDefaultAsync(x => x.Id == id);

        if (existing == null)
        {
            return false;
        }

        _dbContext.Users.Remove(existing);
        await _dbContext.SaveChangesAsync();
        return true;
    }

    /// <summary>
    /// ユーザー論理削除
    /// </summary>
    public async Task<bool> SoftDeleteAsync(long id, string? updatedBy = null)
    {
        var existing = await _dbContext.Users
            .FirstOrDefaultAsync(x => x.Id == id && x.DeletedAt == null);

        if (existing == null)
        {
            return false;
        }

        existing.DeletedAt = DateTime.Now;
        existing.DeletedBy = updatedBy;
        existing.UpdatedBy = updatedBy;
        existing.UpdatedAt = DateTime.Now;
        existing.IsActive = false;

        await _dbContext.SaveChangesAsync();
        return true;
    }
}