namespace CruiseHousing.Api.Messages
{
    /// <summary>
    /// 入力チェックメッセージ定義
    /// </summary>
    public static class ValidationMessages
    {
        /// <summary>
        /// 必須入力
        /// </summary>
        public const string Required = "{0}は必須です。";

        /// <summary>
        /// 最大文字数
        /// </summary>
        public const string MaxLength = "{0}は{1}文字以内で入力してください。";

        /// <summary>
        /// 最小文字数
        /// </summary>
        public const string MinLength = "{0}は{1}文字以上で入力してください。";

        /// <summary>
        /// 文字数範囲
        /// </summary>
        public const string LengthRange = "{0}は{2}文字以上{1}文字以内で入力してください。";

        /// <summary>
        /// メール形式
        /// </summary>
        public const string Email = "{0}の形式が不正です。";

        /// <summary>
        /// 数値範囲
        /// </summary>
        public const string Range = "{0}は{1}から{2}の範囲で入力してください。";

        /// <summary>
        /// 不正な値
        /// </summary>
        public const string Invalid = "{0}の値が不正です。";

        /// <summary>
        /// 一致しない
        /// </summary>
        public const string NotMatch = "{0}が一致しません。";
    }
}