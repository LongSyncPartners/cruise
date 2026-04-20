namespace CruiseHousing.Api.Constants;

/// <summary>
/// ジョブステータス定義
/// </summary>
public static class JobStatuses
{
    public const string Pending = "Pending";     // 未開始
    public const string Running = "Running";     // 実行中
    public const string Completed = "Completed"; // 完了
    public const string Failed = "Failed";       // 失敗
}