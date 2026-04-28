import { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

type Option = {
  value: string | number;
  label: string;
};

type EditableDropdownListProps = {
  value: string | number | null | undefined;
  onChange: (value: string | number | null) => void;
  options: Option[];
  required?: boolean;
};

export default function EditableDropdownList({
  value,
  onChange,
  options,
  required = false,
}: EditableDropdownListProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState<string | number | "">(
    value ?? ""
  );
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isEditing) {
      setInputValue(value ?? "");
    }
  }, [value, isEditing]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const validate = (val: string | number | ""): string | null => {
    if (required && (val === "" || val === null)) {
      return "必須項目です";
    }
    return null;
  };

  const commitValue = () => {
    const err = validate(inputValue);

    if (err) {
      setError(err);
      return;
    }

    onChange(inputValue === "" ? null : inputValue);
    setIsEditing(false);
    setError(null);
  };

  if (!isEditing) {
    const selected = options.find((o) => o.value === value);

    return (
      <div
        onDoubleClick={() => setIsEditing(true)}
        style={{
          width: "100%",
          minHeight: 24,
          cursor: "pointer",
        }}
      >
        {selected?.label ?? ""}
      </div>
    );
  }

  return (
    <TextField
      select
      fullWidth
      variant="standard"
      value={inputValue}
      inputRef={inputRef}
      onChange={(e) => {
        const val = e.target.value;
        setInputValue(val);
        setError(validate(val));
      }}
      onBlur={commitValue}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          commitValue();
        }
        if (e.key === "Escape") {
          setInputValue(value ?? "");
          setIsEditing(false);
          setError(null);
        }
      }}
      error={!!error}
      helperText={error}
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
    >
      {options.map((opt) => (
        <MenuItem key={opt.value} value={opt.value}>
          {opt.label}
        </MenuItem>
      ))}
    </TextField>
  );
}