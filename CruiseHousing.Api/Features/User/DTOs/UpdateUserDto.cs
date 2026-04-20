using System.ComponentModel.DataAnnotations;
using CruiseHousing.Api.Messages;

namespace CruiseHousing.Api.Features.User.DTOs
{
    /// <summary>
    /// ユーザー更新DTO
    /// </summary>
    public class UpdateUserDto
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
        /// 更新ユーザーID
        /// </summary>
        [Display(Name = "更新ユーザーID")]
        [StringLength(10, ErrorMessage = ValidationMessages.MaxLength)]
        public string? UpdUserId { get; set; }

        /// <summary>
        /// 更新ユーザー
        /// </summary>
        [Display(Name = "更新ユーザー")]
        [StringLength(50, ErrorMessage = ValidationMessages.MaxLength)]
        public string? UpdUser { get; set; }
    }
}