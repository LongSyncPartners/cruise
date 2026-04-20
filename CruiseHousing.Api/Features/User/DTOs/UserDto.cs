namespace CruiseHousing.Api.Features.User.DTOs
{
    /// <summary>
    /// ユーザー返却用DTO
    /// </summary>
    public class UserDto
    {
        /// <summary>
        /// ユーザーID
        /// </summary>
        public long UserId { get; set; }

        /// <summary>
        /// ユーザー名
        /// </summary>
        public string? UserName { get; set; }

        /// <summary>
        /// メールアドレス
        /// </summary>
        public string? UserEmail { get; set; }

        /// <summary>
        /// ユーザー権限
        /// </summary>
        public string? UserRole { get; set; }

        /// <summary>
        /// 登録日時
        /// </summary>
        public DateTime? AddDate { get; set; }

        /// <summary>
        /// 更新日時
        /// </summary>
        public DateTime? UpdDate { get; set; }
    }
}