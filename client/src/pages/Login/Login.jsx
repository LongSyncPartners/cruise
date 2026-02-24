import {
  Dialog,
  DialogContent,
  Box,
  TextField,
  Button,
  Typography,
  Divider,
  Stack
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1000));
    // giả lập API
    const fakeJwt = "ey.fake.jwt";

    login(fakeJwt);
    navigate("/dashboard");
  };

  return (

      <Dialog open maxWidth={false}
        PaperProps={{ sx: { width: 450, border: "1px solid #999", borderRadius: 0 , p: 2} }}
      >
        <Box sx={{ p: 1.5, textAlign: "center" }}>
          <Typography fontWeight="bold">ログイン</Typography>
        </Box>
        <Divider />

        <DialogContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <TextField
                size="small"
                placeholder="メールアドレス"
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register("email", { required: "メールアドレスは必須です" })}
              />

              <TextField
                size="small"
                type="password"
                placeholder="パスワード"
                error={!!errors.password}
                helperText={errors.password?.message}
                {...register("password", { required: "パスワードは必須です" })}
              />

              <Button variant="contained" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "ログイン中..." : "ログイン"}
              </Button>
            </Stack>
          </Box>
        </DialogContent>
        <Divider />
        <Box sx={{ p: 1.5, textAlign: "center" }}>
          <Typography color="red" >*パスワードを忘れの方はこちら</Typography>
        </Box>
      </Dialog>

  );
}
