export function validateLogin({ username, password }) {
    if (!username) return "ユーザーID必須";
    if (!password) return "パスワード必須";
    return null;
}
