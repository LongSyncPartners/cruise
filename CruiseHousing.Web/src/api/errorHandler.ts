import axios from "axios";

export function getUserFriendlyMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return "サーバーに接続できません。";
    }

    if (error.response.status === 401) {
      return "認証エラーが発生しました。";
    }

    if (error.response.status >= 500) {
      return "サーバーエラーが発生しました。";
    }
  }

  return "エラーが発生しました。";
}