using CruiseHousing.Api.Data;
using CruiseHousing.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace CruiseHousing.Api.Repositories;

/// <summary>
/// UserテーブルRepository実装
/// </summary>
public class UserRepository
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
    /// 削除フラグが立っていないデータのみ取得
    /// </summary>
    public async Task<List<User>> GetAllAsync()
    {
        return await _dbContext.Users
            .AsNoTracking()
            .Where(x => x.DelFlg != "1")
            .OrderByDescending(x => x.UserId)
            .ToListAsync();
    }

    /// <summary>
    /// IDでユーザー取得
    /// </summary>
    public async Task<User?> GetByIdAsync(long userId)
    {
        return await _dbContext.Users
            .FirstOrDefaultAsync(x => x.UserId == userId && x.DelFlg != "1");
    }

    /// <summary>
    /// メールアドレスでユーザー取得
    /// </summary>
    public async Task<User?> GetByEmailAsync(string userEmail)
    {
        return await _dbContext.Users
            .FirstOrDefaultAsync(x => x.UserEmail == userEmail && x.DelFlg != "1");
    }

    /// <summary>
    /// ユーザー新規登録
    /// </summary>
    public async Task<User> CreateAsync(User entity)
    {
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
            .FirstOrDefaultAsync(x => x.UserId == entity.UserId && x.DelFlg != "1");

        if (existing == null)
        {
            return null;
        }

        existing.UserName = entity.UserName;
        existing.UserEmail = entity.UserEmail;
        existing.UserRole = entity.UserRole;
        existing.PasswordHash = entity.PasswordHash;
        existing.UpdUserId = entity.UpdUserId;
        existing.UpdUser = entity.UpdUser;
        existing.UpdDate = entity.UpdDate;

        await _dbContext.SaveChangesAsync();
        return existing;
    }

    /// <summary>
    /// ユーザー物理削除
    /// </summary>
    public async Task<bool> DeleteAsync(long userId)
    {
        var existing = await _dbContext.Users
            .FirstOrDefaultAsync(x => x.UserId == userId);

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
    public async Task<bool> SoftDeleteAsync(long userId, string? updUserId = null, string? updUser = null)
    {
        var existing = await _dbContext.Users
            .FirstOrDefaultAsync(x => x.UserId == userId && x.DelFlg != "1");

        if (existing == null)
        {
            return false;
        }

        existing.DelFlg = "1";
        existing.DelDate = DateTime.Now;
        existing.UpdUserId = updUserId;
        existing.UpdUser = updUser;
        existing.UpdDate = DateTime.Now;

        await _dbContext.SaveChangesAsync();
        return true;
    }
}
