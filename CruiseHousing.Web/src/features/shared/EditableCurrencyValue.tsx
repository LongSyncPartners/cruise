import { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import CurrencyCell from "./CurrencyCell";

type EditableCurrencyValueProps = {
  value: number | null | undefined;
  onChange: (value: number | null) => void;
  maxLength?: number;
  showZero?: boolean;
};

const toInputValue = (value: number | null | undefined) => {
  return value === null || value === undefined ? "" : String(value);
};

const parseInputValue = (value: string): number | null => {
  const normalized = value.replace(/,/g, "").trim();

  if (normalized === "" || normalized === "-" || normalized === ".") {
    return null;
  }

  const parsed = Number(normalized);

  return Number.isNaN(parsed) ? null : parsed;
};

export default function EditableCurrencyValue({
  value,
  onChange,
  maxLength = 10,
  showZero = false,
}: EditableCurrencyValueProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(toInputValue(value));

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let nextValue = event.target.value;

    nextValue = nextValue.replace(/[^\d.-]/g, "");
    nextValue = nextValue.replace(/(?!^)-/g, "");

    const parts = nextValue.split(".");
    if (parts.length > 2) {
      nextValue = parts[0] + "." + parts.slice(1).join("");
    }

    if (nextValue.includes(".")) {
      const [integerPart, decimalPart] = nextValue.split(".");
      nextValue = integerPart + "." + (decimalPart ?? "").slice(0, 2);
    }

    if (nextValue.length > maxLength) {
      return;
    }

    setInputValue(nextValue);
  };

  const commitValue = () => {
    const parsedValue = parseInputValue(inputValue);
    onChange(parsedValue);
    setIsEditing(false);
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
        <CurrencyCell value={value} showZero={showZero} />
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
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          commitValue();
        }

        if (event.key === "Escape") {
          setInputValue(toInputValue(value));
          setIsEditing(false);
        }
      }}
      inputProps={{
        inputMode: "decimal",
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
          textAlign: "right",
          padding: 0,
          fontWeight: "bold",
        },
      }}
    />
  );
}