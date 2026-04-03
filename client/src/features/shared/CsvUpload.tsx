import React from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

export type CsvUploadProps = {
  value?: File | null;
  onChange?: (file: File | null) => void;
  disabled?: boolean;
};

export default function CsvUpload({
  value,
  onChange,
  disabled = false,
}: CsvUploadProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  /**
   * Check if file is CSV
   * CSVファイルかどうか判定
   */
  const isCsvFile = (file: File) => {
    return (
      file.type === "text/csv" ||
      file.name.toLowerCase().endsWith(".csv")
    );
  };

  /**
   * Handle selected file
   * ファイル選択処理
   */
  const handleFile = (file: File | null) => {
    if (!file) {
      onChange?.(null);
      return;
    }

    if (!isCsvFile(file)) {
      alert("CSVファイルのみ選択可能です");
      onChange?.(null);
      return;
    }

    onChange?.(file);
  };

  /**
   * Input change (click select)
   * inputからのファイル選択
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    handleFile(file);

    // reset to allow re-select same file
    // 同じファイルを再選択できるようにリセット
    event.target.value = "";
  };

  /**
   * Drop event
   * ドロップ処理
   */
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0] ?? null;
    handleFile(file);
  };

  /**
   * Drag events
   * ドラッグイベント
   */
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  /**
   * Open file dialog
   * ファイル選択ダイアログを開く
   */
  const openFileDialog = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  /**
   * Clear file
   * ファイル削除
   */
  const clearFile = () => {
    if (disabled) return;
    onChange?.(null);
  };

  return (
    <Stack spacing={1.5}>
      {/* Drop Zone */}
      <Box
        onClick={openFileDialog}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        sx={{
          border: "2px dashed",
          borderColor: isDragging ? "primary.main" : "grey.400",
          borderRadius: 2,
          p: 3,
          textAlign: "center",
          cursor: disabled ? "not-allowed" : "pointer",
          backgroundColor: isDragging ? "action.hover" : "background.paper",
          opacity: disabled ? 0.6 : 1,
          transition: "0.2s",
        }}
      >
        <Stack spacing={1} alignItems="center">
          <UploadFileIcon color={isDragging ? "primary" : "action"} />
          <Typography variant="body1">
            CSVファイルをドラッグ＆ドロップ、またはクリックして選択
          </Typography>
        </Stack>

        <input
          ref={inputRef}
          type="file"
          accept=".csv,text/csv"
          hidden
          onChange={handleInputChange}
        />
      </Box>

      {/* File name */}
      {value && (
        <Box
          sx={{
            px: 2,
            py: 1.5,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
          }}
        >
          <Typography variant="body2">
            <strong>ファイル名：</strong> {value.name}
          </Typography>
        </Box>
      )}

      {/* Actions */}
      <Stack direction="row" spacing={1}>
        <Button
          variant="outlined"
          onClick={openFileDialog}
          disabled={disabled}
        >
          ファイルを選択する
        </Button>

        <Button
          variant="text"
          onClick={clearFile}
          disabled={disabled || !value}
        >
          キャンセル
        </Button>
      </Stack>
    </Stack>
  );
}