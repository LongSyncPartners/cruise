using CruiseHousing.Api.Models;
using CruiseHousing.Api.Repositories;

namespace CruiseHousing.Api.Features.ImportFiles
{
    /// <summary>
    /// ImportFile業務処理用Service
    /// </summary>
    public class ImportFileService
    {
        private readonly ImportFileRepository _importFileRepository;

        /// <summary>
        /// コンストラクタ
        /// </summary>
        public ImportFileService(ImportFileRepository importFileRepository)
        {
            _importFileRepository = importFileRepository;
        }

        /// <summary>
        /// ImportFile一覧取得
        /// </summary>
        public async Task<List<ImportFile>> GetAllAsync()
        {
            return await _importFileRepository.GetAllAsync();
        }

        /// <summary>
        /// IDでImportFile取得
        /// </summary>
        public async Task<ImportFile?> GetByIdAsync(long importFileId)
        {
            return await _importFileRepository.GetByIdAsync(importFileId);
        }

        /// <summary>
        /// ImportFile新規登録
        /// </summary>
        public async Task<ImportFile> CreateAsync(ImportFile entity)
        {
            entity.DelFlg ??= "0";
            entity.AddDate ??= DateTime.Now;
            entity.UpdDate ??= DateTime.Now;

            return await _importFileRepository.CreateAsync(entity);
        }

        /// <summary>
        /// ImportFile更新
        /// </summary>
        public async Task<ImportFile?> UpdateAsync(ImportFile entity)
        {
            entity.UpdDate = DateTime.Now;
            return await _importFileRepository.UpdateAsync(entity);
        }

        /// <summary>
        /// ImportFile物理削除
        /// </summary>
        public async Task<bool> DeleteAsync(long importFileId)
        {
            return await _importFileRepository.DeleteAsync(importFileId);
        }

        /// <summary>
        /// ImportFile論理削除
        /// </summary>
        public async Task<bool> SoftDeleteAsync(long importFileId, string? updUserId = null, string? updUser = null)
        {
            return await _importFileRepository.SoftDeleteAsync(importFileId, updUserId, updUser);
        }
    }
}