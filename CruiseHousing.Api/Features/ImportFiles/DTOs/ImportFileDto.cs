namespace CruiseHousing.Api.Features.ImportFiles.DTOs
{
    public class ImportFileDto
    {
        public long ImportFileId { get; set; }
        public string? FileName { get; set; }
        public string? Status { get; set; }
        public DateTime? UploadTime { get; set; }
    }
}
