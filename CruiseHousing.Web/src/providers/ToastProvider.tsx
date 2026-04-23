import { createContext, useContext, useState } from "react";
import type { AlertColor } from "@mui/material";
import CommonToast from "@/features/shared/CommonToast";

type ToastState = {
  open: boolean;
  message: string;
  description?: string;
  severity: AlertColor;
};

type ToastContextType = {
  showToast: (
    message: string,
    severity?: AlertColor,
    description?: string
  ) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastState>({
    open: false,
    message: "",
    severity: "success",
  });

  const showToast = (
    message: string,
    severity: AlertColor = "success",
    description?: string
  ) => {
    setToast({
      open: true,
      message,
      description,
      severity,
    });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <CommonToast
        open={toast.open}
        message={toast.message}
        description={toast.description}
        severity={toast.severity}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
      />
    </ToastContext.Provider>
  );
}

export function useAppToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useAppToast must be used within ToastProvider");
  }

  return context;
}