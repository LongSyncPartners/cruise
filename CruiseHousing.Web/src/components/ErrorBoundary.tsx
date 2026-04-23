// src/components/ErrorBoundary.tsx

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Box, Button, Typography } from "@mui/material";
import { handleError } from "@/utils/errorHandler";

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

type State = {
  hasError: boolean;
  errorMessage: string;
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      hasError: false,
      errorMessage: "",
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      errorMessage: error.message || "Something went wrong.",
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    handleError(
      {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
      },
      "ErrorBoundary"
    );
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 3,
          }}
        >
          <Box
            sx={{
              maxWidth: 480,
              width: "100%",
              textAlign: "center",
            }}
          >
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Unexpected error
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {this.state.errorMessage || "Something went wrong."}
            </Typography>

            <Button variant="contained" onClick={this.handleReload}>
              Reload page
            </Button>
          </Box>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;