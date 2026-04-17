import { Backdrop, CircularProgress } from "@mui/material";

type LoadingDialogProps = {
  open: boolean;
};

export default function LoadingDialog({ open }: LoadingDialogProps) {
  return (
    <Backdrop
      open={open}
      sx={(theme) => ({
        zIndex: theme.zIndex.modal + 1,
        color: "#fff",
      })}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}