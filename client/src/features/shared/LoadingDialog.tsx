import * as React from "react";
import { Dialog, DialogContent, CircularProgress, Box } from "@mui/material";

type Props = {
  open: boolean;
};

export default function LoadingDialog({ open }: Props) {
  return (
    <Dialog
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "transparent",
          boxShadow: "none",
          overflow: "hidden",
        },
      }}
    >
      <DialogContent
        sx={{
          p: 0,
          backgroundColor: "transparent",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 80,
            minHeight: 80,
          }}
        >
          <CircularProgress />
        </Box>
      </DialogContent>
    </Dialog>
  );
}