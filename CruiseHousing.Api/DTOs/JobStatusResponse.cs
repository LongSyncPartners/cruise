namespace CruiseHousing.Api.DTOs
{
    public class JobStatusResponse
    {
        public long JobId { get; set; }

        public string Status { get; set; } = string.Empty;

        public string? ErrorMessage { get; set; }

        public string? DownloadUrl { get; set; }
    }
}
