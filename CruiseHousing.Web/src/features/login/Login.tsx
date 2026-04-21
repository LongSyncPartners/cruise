
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useLoginMutation } from "@/hooks/useLoginMutation";
import { useAppToast } from "@/providers/ToastProvider";
import axios from "axios";

type LoginFormValues = {
  loginIdOrEmail: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      loginIdOrEmail: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const { showToast } = useAppToast();
  
  const { mutateAsync } = useLoginMutation();

  const onSubmit = async (data: LoginFormValues) => {
    try {
    /**
    await new Promise((r) => setTimeout(r, 1000));

    console.log("login data", data);

    // fake API
    const fakeJwt = "ey.fake.jwt";
    login(fakeJwt);
    */

      await mutateAsync({
        loginIdOrEmail: data.loginIdOrEmail,
        password: data.password,
      });

      navigate("/properties");

    } catch (error) {
      if (axios.isAxiosError(error)) {
        showToast("ログインに失敗しました。", "error", error.response?.data?.message);
      } else {
        showToast("ログインに失敗しました。", "error");
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      {/* LEFT BACKGROUND */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: "#67A1E6",
          backgroundSize: "cover",
          backgroundPosition: "center",
          marginRight: 20,
        }}
      />

      {/* CENTER (LOGIN FORM) */}
      <Box
        sx={{
          width: 480,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#ffffff",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            paddingTop: 7,
            paddingBottom: 5,
            paddingLeft: 7,
            paddingRight: 7,
            borderRadius: 2,
          }}
        >
          {Object.keys(errors).length > 0 && (
            <Box
              sx={{
                color: "red",
                marginBottom: 2,
                paddingBottom: 1,
              }}
            >
              {Object.values(errors).map((err, index) => (
                <div key={index}>{err.message}</div>
              ))}
            </Box>
          )}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2}>
              <TextField
                size="small"
                type="text"
                label="ユーザーID／メールアドレス"
                sx={{
                  paddingBottom: 1,
                }}
                slotProps={{
                  htmlInput: {
                    maxLength: 30,
                  },
                }}
                fullWidth
                error={!!errors.loginIdOrEmail}
                {...register("loginIdOrEmail", {
                  required: "ユーザーID／メールアドレスは必須です",
                  maxLength: {
                    value: 30,
                    message: "ユーザーID／メールアドレスは30文字以下で入力してください",
                  },
                  validate: {
                    notOnlySpaces: (value) =>
                      value.trim().length > 0 ||
                      "ユーザーID／メールアドレスは必須です",
                  },
                })}
              />

              <TextField
                size="small"
                type="password"
                label="パスワード"
                sx={{
                  paddingBottom: 1,
                }}
                slotProps={{
                  htmlInput: {
                    maxLength: 16,
                  },
                }}
                fullWidth
                error={!!errors.password}
                {...register("password", {
                  required: "パスワードは必須です",
                  validate: (value) => {
                    if (value.length < 8 || value.length > 16) {
                      return "パスワードは8～16文字で入力してください";
                    }
                    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(value)) {
                      return "パスワードは大文字・小文字・数字を含めて入力してください";
                    }
                    return true;
                  },
                })}
              />

              <Button type="submit" variant="contained" fullWidth>
                ログイン
              </Button>
            </Stack>
          </Box>

          <Typography
            variant="body2"
            sx={{
              mt: 1,
              paddingTop: 1,
              textAlign: "right",
              color: "primary.main",
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            パスワード再設定
          </Typography>
        </Paper>
      </Box>

      {/* RIGHT BACKGROUND */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: "#67A1E6",
          backgroundSize: "cover",
          backgroundPosition: "center",
          marginLeft: 20,
        }}
      />
    </Box>
  );
}