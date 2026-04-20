namespace CruiseHousing.Api.Features.User.DTOs
{
    public class ExportUsersCsvRequestDto
    {
        /// <summary>
        /// ユーザー名
        /// </summary>
        public string? UserName { get; set; }

        /// <summary>
        /// メールアドレス
        /// </summary>
        public string? UserEmail { get; set; }
    }
}
