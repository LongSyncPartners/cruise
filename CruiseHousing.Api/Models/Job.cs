using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CruiseHousing.Api.Models;

/// <summary>
/// ジョブ管理テーブル
/// インポート / エクスポート処理の実行状況を管理する
/// </summary>
[Table("jobs")]
public class Job
{
    /// <summary>
    /// ジョブID（主キー）
    /// </summary>
    [Key]
    [Column("job_id")]
    public long JobId { get; set; }

    /// <summary>
    /// ジョブ種類（Import / Export など）
    /// </summary>
    [Required]
    [MaxLength(20)]
    [Column("job_type")]
    public string JobType { get; set; } = string.Empty;

    /// <summary>
    /// 対象種類（User / Room など）
    /// </summary>
    [Required]
    [MaxLength(50)]
    [Column("target_type")]
    public string TargetType { get; set; } = string.Empty;

    /// <summary>
    /// ジョブステータス（Pending / Running / Completed / Failed）
    /// </summary>
    [Required]
    [MaxLength(20)]
    [Column("status")]
    public string Status { get; set; } = string.Empty;

    /// <summary>
    /// ファイル名
    /// </summary>
    [MaxLength(255)]
    [Column("file_name")]
    public string? FileName { get; set; }

    /// <summary>
    /// 入力ファイルパス
    /// </summary>
    [MaxLength(500)]
    [Column("input_file_path")]
    public string? InputFilePath { get; set; }

    /// <summary>
    /// 出力ファイルパス
    /// </summary>
    [MaxLength(500)]
    [Column("output_file_path")]
    public string? OutputFilePath { get; set; }

    /// <summary>
    /// フィルター条件（JSON形式）
    /// </summary>
    [Column("filter_json", TypeName = "text")]
    public string? FilterJson { get; set; }

    /// <summary>
    /// 依頼ユーザーID
    /// </summary>
    [Required]
    [Column("requested_by")]
    public long RequestedBy { get; set; }

    /// <summary>
    /// 総件数
    /// </summary>
    [Required]
    [Column("total_rows")]
    public int TotalRows { get; set; }

    /// <summary>
    /// 成功件数
    /// </summary>
    [Required]
    [Column("success_rows")]
    public int SuccessRows { get; set; }

    /// <summary>
    /// 失敗件数
    /// </summary>
    [Required]
    [Column("failed_rows")]
    public int FailedRows { get; set; }

    /// <summary>
    /// エラーメッセージ
    /// </summary>
    [Column("error_message", TypeName = "text")]
    public string? ErrorMessage { get; set; }

    /// <summary>
    /// 作成日時
    /// </summary>
    [Required]
    [Column("created_at")]
    public DateTime CreatedAt { get; set; }

    /// <summary>
    /// 処理開始日時
    /// </summary>
    [Column("started_at")]
    public DateTime? StartedAt { get; set; }

    /// <summary>
    /// 処理終了日時
    /// </summary>
    [Column("completed_at")]
    public DateTime? CompletedAt { get; set; }

    /// <summary>
    /// 更新日時
    /// </summary>
    [Column("updated_at")]
    public DateTime? UpdatedAt { get; set; }
}