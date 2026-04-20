import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import WarningIcon from '@mui/icons-material/Warning';

type UnsavedChangesDialogProps = {
  open: boolean;
  title?: string;
  message: string;
  onSave: () => void;
  onDiscard: () => void;
  onCancel: () => void;
  saveText?: string;
  discardText?: string;
  cancelText?: string;
};

export default function UnsavedChangesDialog({
  open,
  title = "確認",
  message,
  onSave,
  onDiscard,
  onCancel,
  saveText = "保存",
  discardText = "保存せずに移動",
  cancelText = "キャンセル",
}: UnsavedChangesDialogProps) {
  return (
    <Dialog
      open={open} onClose={onCancel} sx={{ "& .MuiDialog-paper": { padding: 0.5 } }}>

      <DialogContent sx={{display:"inline-flex"}}>
        <WarningIcon sx={{ fontSize: "large", color: "warning.main", verticalAlign: "middle", mr:1 }} />
        <DialogContentText sx={{ fontWeight: "500" }}>{message}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onCancel}>
          {cancelText}
        </Button>

        <Button color="warning" onClick={onDiscard}>
          {discardText}
        </Button>

        <Button variant="contained" color="primary" onClick={onSave}>
          {saveText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}