import { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";

type EditableTextFieldProps = {
  value: string | null | undefined;
  onChange: (value: string | null) => void;
  maxLength?: number;
  required?: boolean;
};

const toInputValue = (value: string | null | undefined) => {
  return value ?? "";
};

export default function EditableTextField({
  value,
  onChange,
  maxLength = 100,
  required = false,
}: EditableTextFieldProps) {
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
    if (val.length > maxLength) {
      return `${maxLength}文字以内で入力してください`;
    }
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    // chặn maxLength
    if (val.length > maxLength) return;

    setInputValue(val);

    // validate realtime
    const err = validate(val);
    setError(err);
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
      variant="standard"
      value={inputValue}
      inputRef={inputRef}
      onChange={handleChange}
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
      inputProps={{
        maxLength,
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