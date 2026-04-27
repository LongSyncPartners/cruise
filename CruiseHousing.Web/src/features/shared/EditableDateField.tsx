import { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";

type EditableDateFieldProps = {
  value: string | null | undefined;
  onChange: (value: string | null) => void;
  required?: boolean;
};

const toInputValue = (value: string | null | undefined) => {
  return value ?? "";
};

export default function EditableDateField({
  value,
  onChange,
  required = false,
}: EditableDateFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(toInputValue(value));
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isEditing) {
      setInputValue(toInputValue(value));
    }
  }, [value, isEditing]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const validate = (val: string): string | null => {
    if (required && val.trim() === "") {
      return "必須項目です";
    }

    if (val.trim() === "") {
      return null;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(val)) {
      return "YYYY-MM-DD形式で入力してください";
    }

    const date = new Date(val);
    if (Number.isNaN(date.getTime())) {
      return "正しい日付を入力してください";
    }

    return null;
  };

  const commitValue = () => {
    const err = validate(inputValue);

    if (err) {
      setError(err);
      return;
    }

    onChange(inputValue.trim() === "" ? null : inputValue);
    setIsEditing(false);
    setError(null);
  };

  if (!isEditing) {
    return (
      <div
        onDoubleClick={() => setIsEditing(true)}
        style={{
          width: "100%",
          minHeight: 24,
          cursor: "text",
        }}
      >
        {value ?? ""}
      </div>
    );
  }

  return (
    <TextField
      fullWidth
      type="date"
      variant="standard"
      value={inputValue}
      inputRef={inputRef}
      onChange={(e) => {
        setInputValue(e.target.value);
        setError(validate(e.target.value));
      }}
      onBlur={commitValue}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          commitValue();
        }

        if (e.key === "Escape") {
          setInputValue(toInputValue(value));
          setIsEditing(false);
          setError(null);
        }
      }}
      error={!!error}
      helperText={error}
      InputLabelProps={{
        shrink: true,
      }}
      sx={{
        height: "100%",
        "& .MuiInputBase-root": {
          padding: 0,
          height: "100%",
          alignItems: "center",
        },
        "& .MuiInputBase-input": {
          padding: 0,
          fontWeight: "bold",
        },
      }}
    />
  );
}