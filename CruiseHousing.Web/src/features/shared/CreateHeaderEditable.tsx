import * as React from "react";
import { Box, InputBase, Typography } from "@mui/material";

type CreateHeaderEditableProps = {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
};

export default function CreateHeaderEditable({
  value,
  onChange,
  placeholder = "Column",
  disabled = false,
  maxLength = 20,
}: CreateHeaderEditableProps) {
  const [editing, setEditing] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(value);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    setInputValue(value);
  }, [value]);

  React.useEffect(() => {
    if (!editing) return;

    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [editing]);

  const handleStartEdit = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (disabled) return;

    setEditing(true);
  };

  const handleCancel = () => {
    setInputValue(value);
    setEditing(false);
  };

  const handleSave = () => {
    const trimmedValue = inputValue.trim();

    if (!trimmedValue) {
      setInputValue(value);
      setEditing(false);
      return;
    }

    if (trimmedValue !== value) {
      onChange?.(trimmedValue);
    }

    setEditing(false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: 32,
        display: "flex",
        alignItems: "center",
        pointerEvents: "auto",
        cursor: disabled ? "default" : "pointer",
      }}
      onClick={(e) => e.stopPropagation()}
      onDoubleClick={handleStartEdit}
    >
      {editing ? (
        <InputBase
          inputRef={inputRef}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value.slice(0, maxLength));
          }}
          fullWidth
          autoFocus
          placeholder={placeholder}
          inputProps={{
            maxLength,
            "aria-label": "Editable header name",
          }}
          sx={{
            width: "100%",
            fontSize: "inherit",
            color: "inherit",
            bgcolor: "transparent",
            "& input": {
              textAlign: "center",
              py: 0.25,
            },
          }}
          onBlur={handleSave}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            e.stopPropagation();

            if (e.key === "Enter") {
              e.preventDefault();
              handleSave();
            }

            if (e.key === "Escape") {
              e.preventDefault();
              handleCancel();
            }
          }}
        />
      ) : (
        <Typography
          variant="body2"
          noWrap
          sx={{
            width: "100%",
            textAlign: "center",
            fontWeight: 600,
            userSelect: "none",
          }}
        >
          {value || placeholder}
        </Typography>
      )}
    </Box>
  );
}