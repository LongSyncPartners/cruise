using CruiseHousing.Api.Models;
using CruiseHousing.Api.Data;
using Microsoft.EntityFrameworkCore;

namespace CruiseHousing.Api.Repositories;

/// <summary>
/// ImportFileテーブルRepository実装
/// </summary>
public class ImportFileRepository
{
    private readonly AppDbContext _dbContext;

    /// <summary>
    /// コンストラクタ
    /// </summary>
    public ImportFileRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    /// <summary>
    /// ImportFile一覧取得
    /// 削除フラグが立っていないデータのみ取得
    /// </summary>
    public async Task<List<ImportFile>> GetAllAsync()
    {
        return await _dbContext.ImportFiles
            .AsNoTracking()
            .Where(x => x.DelFlg != "1")
            .OrderByDescending(x => x.ImportFileId)
            .ToListAsync();
    }

    /// <summary>
    /// IDでImportFile取得
    /// </summary>
    public async Task<ImportFile?> GetByIdAsync(long importFileId)
    {
        return await _dbContext.ImportFiles
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.ImportFileId == importFileId && x.DelFlg != "1");
    }

    /// <summary>
    /// ImportFile新規登録
    /// </summary>
    public async Task<ImportFile> CreateAsync(ImportFile entity)
    {
        await _dbContext.ImportFiles.AddAsync(entity);
        await _dbContext.SaveChangesAsync();
        return entity;
    }

    /// <summary>
    /// ImportFile更新
    /// </summary>
    public async Task<ImportFile?> UpdateAsync(ImportFile entity)
    {
        var existing = await _dbContext.ImportFiles
            .FirstOrDefaultAsync(x => x.ImportFileId == entity.ImportFileId && x.DelFlg != "1");

        if (existing == null)
        {
            return null;
        }

        existing.FileName = entity.FileName;
        existing.FileType = entity.FileType;
        existing.UploadTime = entity.UploadTime;
        existing.Status = entity.Status;
        existing.TotalRows = entity.TotalRows;
        existing.SuccessRows = entity.SuccessRows;
        existing.ErrorRows = entity.ErrorRows;

        existing.UpdUserId = entity.UpdUserId;
        existing.UpdUser = entity.UpdUser;
        existing.UpdDate = entity.UpdDate;

        await _dbContext.SaveChangesAsync();
        return existing;
    }

    /// <summary>
    /// ImportFile物理削除
    /// </summary>
    public async Task<bool> DeleteAsync(long importFileId)
    {
        var existing = await _dbContext.ImportFiles
            .FirstOrDefaultAsync(x => x.ImportFileId == importFileId);

        if (existing == null)
        {
            return false;
        }

        _dbContext.ImportFiles.Remove(existing);
        await _dbContext.SaveChangesAsync();
        return true;
    }

    /// <summary>
    /// ImportFile論理削除
    /// del_flg = 1、del_date更新
    /// </summary>
    public async Task<bool> SoftDeleteAsync(long importFileId, string? updUserId = null, string? updUser = null)
    {
        var existing = await _dbContext.ImportFiles
            .FirstOrDefaultAsync(x => x.ImportFileId == importFileId && x.DelFlg != "1");

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
