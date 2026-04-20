using System.ComponentModel.DataAnnotations;
using CruiseHousing.Api.Messages;

namespace CruiseHousing.Api.Features.User.DTOs
{
    /// <summary>
    /// ユーザー新規登録DTO
    /// </summary>
    public class CreateUserDto
    {
        /// <summary>
        /// ユーザー名
        /// </summary>
        [Display(Name = "ユーザー名")]
        [Required(ErrorMessage = ValidationMessages.Required)]
        [StringLength(20, ErrorMessage = ValidationMessages.MaxLength)]
        public string? UserName { get; set; }

        /// <summary>
        /// メールアドレス
        /// </summary>
        [Display(Name = "メールアドレス")]
        [Required(ErrorMessage = ValidationMessages.Required)]
        [EmailAddress(ErrorMessage = ValidationMessages.Email)]
        [StringLength(50, ErrorMessage = ValidationMessages.MaxLength)]
        public string? UserEmail { get; set; }

        /// <summary>
        /// ユーザー権限
        /// </summary>
        [Display(Name = "ユーザー権限")]
        [Required(ErrorMessage = ValidationMessages.Required)]
        [StringLength(20, ErrorMessage = ValidationMessages.MaxLength)]
        public string? UserRole { get; set; }

        /// <summary>
        /// パスワード
        /// </summary>
        [Display(Name = "パスワード")]
        [Required(ErrorMessage = ValidationMessages.Required)]
        [StringLength(60, MinimumLength = 6, ErrorMessage = ValidationMessages.LengthRange)]
        public string? Password { get; set; }

        /// <summary>
        /// 登録ユーザーID
        /// </summary>
        [Display(Name = "登録ユーザーID")]
        [StringLength(10, ErrorMessage = ValidationMessages.MaxLength)]
        public string? RegUserid { get; set; }

        /// <summary>
        /// 登録ユーザー
        /// </summary>
        [Display(Name = "登録ユーザー")]
        [StringLength(50, ErrorMessage = ValidationMessages.MaxLength)]
        public string? RegUser { get; set; }
    }
}