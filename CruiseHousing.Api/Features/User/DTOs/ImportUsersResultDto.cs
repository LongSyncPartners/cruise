namespace CruiseHousing.Api.Features.User.DTOs
{
    public class ImportUsersResultDto
    {
        /// <summary>
        /// 総件数
        /// </summary>
        public int TotalRows { get; set; }

        /// <summary>
        /// 成功件数
        /// </summary>
        public int SuccessRows { get; set; }

        /// <summary>
        /// 失敗件数
        /// </summary>
        public int FailedRows { get; set; }

        /// <summary>
        /// エラー内容一覧
        /// </summary>
        public List<string> Errors { get; set; } = [];
    }
}
