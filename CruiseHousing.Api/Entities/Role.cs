using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CruiseHousing.Api.Entities;

/// <summary>
/// ロールマスタ
/// </summary>
[Table("m_roles")]
public class Role
{
    /// <summary>
    /// ID (PK)
    /// </summary>
    [Key]
    [Column("id")]
    public long Id { get; set; }

    /// <summary>
    /// ロールコード
    /// </summary>
    [Required]
    [Column("code")]
    [StringLength(20)]
    public string Code { get; set; } = string.Empty;

    /// <summary>
    /// ロール名
    /// </summary>
    [Required]
    [Column("name")]
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// 表示順
    /// </summary>
    [Column("display_order")]
    public int? DisplayOrder { get; set; }

    /// <summary>
    /// 有効フラグ
    /// </summary>
    [Required]
    [Column("is_active")]
    public bool IsActive { get; set; } = true;

    /// <summary>
    /// 作成日時
    /// </summary>
    [Required]
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
    [Required]
    [Column("updated_at")]
    public DateTime UpdatedAt { get; set; }

    /// <summary>
    /// 更新者
    /// </summary>
    [Column("updated_by")]
    [StringLength(50)]
    public string? UpdatedBy { get; set; }

    /// <summary>
    /// 削除日時
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
    /// ユーザー一覧 (Navigation)
    /// </summary>
    public ICollection<User> Users { get; set; } = new List<User>();
}
