using System.ComponentModel.DataAnnotations;
using CruiseHousing.Api.Messages;

namespace CruiseHousing.Api.Features.User.DTOs;

/// <summary>
/// ユーザー新規登録DTO
/// </summary>
public class CreateUserDto
{
    /// <summary>
    /// ログインID
    /// </summary>
    [Display(Name = "ログインID")]
    [Required(ErrorMessage = ValidationMessages.Required)]
    [StringLength(50, ErrorMessage = ValidationMessages.MaxLength)]
    public string LoginId { get; set; } = string.Empty;

    /// <summary>
    /// ユーザー名
    /// </summary>
    [Display(Name = "ユーザー名")]
    [Required(ErrorMessage = ValidationMessages.Required)]
    [StringLength(100, ErrorMessage = ValidationMessages.MaxLength)]
    public string UserName { get; set; } = string.Empty;

    /// <summary>
    /// メールアドレス
    /// </summary>
    [Display(Name = "メールアドレス")]
    [Required(ErrorMessage = ValidationMessages.Required)]
    [EmailAddress(ErrorMessage = ValidationMessages.Email)]
    [StringLength(255, ErrorMessage = ValidationMessages.MaxLength)]
    public string Email { get; set; } = string.Empty;

    /// <summary>
    /// パスワード
    /// </summary>
    [Display(Name = "パスワード")]
    [Required(ErrorMessage = ValidationMessages.Required)]
    [StringLength(100, MinimumLength = 6, ErrorMessage = ValidationMessages.LengthRange)]
    public string Password { get; set; } = string.Empty;

    /// <summary>
    /// ロールID
    /// </summary>
    [Display(Name = "ロールID")]
    [Required(ErrorMessage = ValidationMessages.Required)]
    public long RoleId { get; set; }

    /// <summary>
    /// 有効フラグ
    /// </summary>
    [Display(Name = "有効フラグ")]
    public bool IsActive { get; set; } = true;

    /// <summary>
    /// 作成者
    /// </summary>
    [Display(Name = "作成者")]
    [StringLength(50, ErrorMessage = ValidationMessages.MaxLength)]
    public string? CreatedBy { get; set; }

    /// <summary>
    /// パスワードハッシュ
    /// Mapper/Service用
    /// </summary>
    public string PasswordHash => Password;
}