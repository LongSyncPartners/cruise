using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CruiseHousing.Api.Entities;

/// <summary>
/// ユーザー
/// </summary>
[Table("users")]
public class User
{
    /// <summary>
    /// ID (PK)
    /// </summary>
    [Key]
    [Column("id")]
    public long Id { get; set; }

    /// <summary>
    /// ログインID
    /// </summary>
    [Required]
    [Column("login_id")]
    [StringLength(50)]
    public string LoginId { get; set; } = string.Empty;

    /// <summary>
    /// ユーザー名（表示用）
    /// </summary>
    [Required]
    [Column("user_name")]
    [StringLength(100)]
    public string UserName { get; set; } = string.Empty;

    /// <summary>
    /// メールアドレス
    /// </summary>
    [Required]
    [Column("email")]
    [StringLength(255)]
    public string Email { get; set; } = string.Empty;

    /// <summary>
    /// パスワードハッシュ
    /// </summary>
    [Required]
    [Column("password_hash")]
    [StringLength(255)]
    public string PasswordHash { get; set; } = string.Empty;

    /// <summary>
    /// ロールID (FK)
    /// </summary>
    [Column("role_id")]
    public long RoleId { get; set; }

    /// <summary>
    /// 有効フラグ
    /// </summary>
    [Column("is_active")]
    public bool IsActive { get; set; } = true;

    /// <summary>
    /// 作成日時
    /// </summary>
    [Column("created_at")]
    public DateTime CreatedAt { get; set; }

    /// <summary>
    /// 作成者
    /// </summary>
    [Column("created_by")]
    [StringLength(50)]
    public string? CreatedBy { get; set; }

    /// <summary>
    /// 更新日時
    /// </summary>
    [Column("updated_at")]
    public DateTime UpdatedAt { get; set; }

    /// <summary>
    /// 更新者
    /// </summary>
    [Column("updated_by")]
    [StringLength(50)]
    public string? UpdatedBy { get; set; }

    /// <summary>
    /// 削除日時（論理削除）
    /// </summary>
    [Column("deleted_at")]
    public DateTime? DeletedAt { get; set; }

    /// <summary>
    /// 削除者
    /// </summary>
    [Column("deleted_by")]
    [StringLength(50)]
    public string? DeletedBy { get; set; }

    /// <summary>
    /// ロール (Navigation)
    /// </summary>
    [ForeignKey(nameof(RoleId))]
    public Role? Role { get; set; }
}