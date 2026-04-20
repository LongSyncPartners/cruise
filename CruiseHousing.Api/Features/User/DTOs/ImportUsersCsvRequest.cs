namespace CruiseHousing.Api.Features.User.DTOs
{
    public class ImportUsersCsvRequest
    {
        /// <summary>
        /// CSVファイル
        /// </summary>
        public IFormFile File { get; set; } = default!;
    }
}
