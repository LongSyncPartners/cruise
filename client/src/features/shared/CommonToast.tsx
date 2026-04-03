import * as React from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";

type Props = {
  open: boolean;
  message: string;
  severity?: AlertColor; // "success" | "error" | "warning" | "info"
  onClose: () => void;
  duration?: number;
};

export default function CommonToast({
  open,
  message,
  severity = "success",
  onClose,
  duration = 3000,
}: Props) {
  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    onClose();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%",  minWidth: 300, textAlign: "center" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}