namespace CruiseHousing.Api.Features.User.DTOs;

/// <summary>
/// ユーザー返却用DTO
/// </summary>
public class UserDto
{
    /// <summary>
    /// ユーザーID
    /// </summary>
    public long Id { get; set; }

    /// <summary>
    /// ログインID
    /// </summary>
    public string LoginId { get; set; } = string.Empty;

    /// <summary>
    /// ユーザー名
    /// </summary>
    public string UserName { get; set; } = string.Empty;

    /// <summary>
    /// メールアドレス
    /// </summary>
    public string Email { get; set; } = string.Empty;

    /// <summary>
    /// ロールID
    /// </summary>
    public long RoleId { get; set; }

    /// <summary>
    /// ロール名
    /// </summary>
    public string? RoleName { get; set; }

    /// <summary>
    /// 有効フラグ
    /// </summary>
    public bool IsActive { get; set; }

    /// <summary>
    /// 作成日時
    /// </summary>
    public DateTime CreatedAt { get; set; }

    /// <summary>
    /// 更新日時
    /// </summary>
    public DateTime UpdatedAt { get; set; }
}