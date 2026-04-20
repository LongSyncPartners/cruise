using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CruiseHousing.Api.Entities
{
    [Table("import_files")]
    public class ImportFile
    {
        /// <summary>
        /// ファイルインポートID
        /// </summary>
        [Key]
        [Column("import_file_id")]
        public long ImportFileId { get; set; }

        /// <summary>
        /// ファイル名
        /// </summary>
        [Column("file_name")]
        [StringLength(255)]
        public string? FileName { get; set; }

        /// <summary>
        /// ファイル種類
        /// </summary>
        [Column("file_type")]
        public string? FileType { get; set; }

        /// <summary>
        /// インポート時間
        /// </summary>
        [Column("upload_time")]
        public DateTime? UploadTime { get; set; }

        /// <summary>
        /// ステータス
        /// </summary>
        [Column("status")]
        public string? Status { get; set; }

        /// <summary>
        /// 総件数
        /// </summary>
        [Column("total_rows")]
        public int? TotalRows { get; set; }

        /// <summary>
        /// 正常件数
        /// </summary>
        [Column("success_rows")]
        public int? SuccessRows { get; set; }

        /// <summary>
        /// エラー件数
        /// </summary>
        [Column("error_rows")]
        public int? ErrorRows { get; set; }

        /// <summary>
        /// 削除フラグ
        /// </summary>
        [Column("del_flg")]
        [StringLength(1)]
        public string? DelFlg { get; set; }

        /// <summary>
        /// 削除日時
        /// </summary>
        [Column("del_date")]
        public DateTime? DelDate { get; set; }

        /// <summary>
        /// 登録ユーザーID
        /// </summary>
        [Column("reg_userid")]
        [StringLength(10)]
        public string? RegUserid { get; set; }

        /// <summary>
        /// 登録ユーザー
        /// </summary>
        [Column("reg_user")]
        [StringLength(50)]
        public string? RegUser { get; set; }

        /// <summary>
        /// 登録日時
        /// </summary>
        [Column("add_date")]
        public DateTime? AddDate { get; set; }

        /// <summary>
        /// 更新ユーザーID
        /// </summary>
        [Column("upd_user_id")]
        [StringLength(10)]
        public string? UpdUserId { get; set; }

        /// <summary>
        /// 更新ユーザー
        /// </summary>
        [Column("upd_user")]
        [StringLength(50)]
        public string? UpdUser { get; set; }

        /// <summary>
        /// 更新日時
        /// </summary>
        [Column("upd_date")]
        public DateTime? UpdDate { get; set; }
    }
}