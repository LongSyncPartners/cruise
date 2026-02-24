import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./loginService";

export function useLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const onSubmit = async () => {
        if (!username || !password) {
            setError("入力してください");
            return;
        }

        try {
            // await login({ username, password });

            // login success → go to dashboard
            navigate("/dashboard");

        } catch {
            setError("ログインが失敗しました。");
        }
    };

    return {
        username,
        password,
        onChangeUsername: e => setUsername(e.target.value),
        onChangePassword: e => setPassword(e.target.value),
        onSubmit,
        error
    };
}
