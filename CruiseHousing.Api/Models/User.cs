using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CruiseHousing.Api.Models
{
    /// <summary>
    /// ユーザーマスタ
    /// </summary>
    [Table("users")]
    public class User
    {
        /// <summary>
        /// ユーザーID
        /// </summary>
        [Key]
        [Column("user_id")]
        public long UserId { get; set; }

        /// <summary>
        /// ユーザー名
        /// </summary>
        [Column("user_name")]
        [StringLength(20)]
        public string? UserName { get; set; }

        /// <summary>
        /// メールアドレス
        /// </summary>
        [Column("user_email")]
        [StringLength(50)]
        public string? UserEmail { get; set; }

        /// <summary>
        /// ユーザー権限
        /// </summary>
        [Column("user_role")]
        [StringLength(20)]
        public string? UserRole { get; set; }

        /// <summary>
        /// パスワードハッシュ
        /// </summary>
        [Column("password_hash")]
        [StringLength(60)]
        public string? PasswordHash { get; set; }

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