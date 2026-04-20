import * as React from "react";
import { Snackbar, Alert, AlertColor, Typography, Box } from "@mui/material";

/**
 * Props for CommonToast component
 */
type Props = {
  open: boolean;              // Controls whether the toast is visible
  message: string;            // Main message (first line)
  description?: string;       // Optional detail message (second line)
  severity?: AlertColor;      // "success" | "error" | "warning" | "info"
  onClose: () => void;        // Callback when toast is closed
  duration?: number;          // Auto hide duration (ms)
};

/**
 * CommonToast
 *
 * A reusable toast component for showing feedback messages.
 *
 * Supports:
 * - Main message (required)
 * - Optional description (for error details, etc.)
 * - Different severity levels
 *
 * Typical usage:
 * - Success: show only message
 * - Error: show message + description
 */
export default function CommonToast({
  open,
  message,
  description,
  severity = "success",
  onClose,
  duration = 3000,
}: Props) {
  /**
   * Handle closing the toast
   * Ignore "clickaway" to prevent accidental close
   */
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
        sx={{
          minWidth: 320,
          textAlign: "left",
          alignItems: "flex-start", // Align content to top for multi-line layout
        }}
      >
        <Box>
          {/* Main message (bold) */}
          <Typography fontWeight={600}>
            {message}
          </Typography>

          {/* Optional detail message */}
          {description && (
            <Typography variant="body2" sx={{ mt: 0.5 }}>
              {description}
            </Typography>
          )}
        </Box>
      </Alert>
    </Snackbar>
  );
}