import * as React from "react";
import {
  GridRenderEditCellParams,
  useGridApiContext,
} from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";

import { parseCurrencyInput } from "./utils";
import { validate, validateMaxLength, validateRequired } from "./validators";

type CurrencyEditCellProps = GridRenderEditCellParams & {
  maxLength?: number;
  required?: boolean;
  labelName?: string;
};

export default function CurrencyEditCell(props: CurrencyEditCellProps) {
  const {
    id,
    field,
    value,
    hasFocus,
    maxLength = 10,
    required = false,
    labelName,
  } = props;

  const apiRef = useGridApiContext();
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (hasFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [hasFocus]);

  const handleChange = async (
    event: React.ChangeEvent<HTMLInputElement>
    ) => {
        let inputValue = event.target.value;

        // Allow only digits, minus sign, and decimal point
        inputValue = inputValue.replace(/[^\d.-]/g, "");

        // Ensure only one minus sign and only at the beginning
        inputValue = inputValue.replace(/(?!^)-/g, "");

        // Ensure only one decimal point
        const parts = inputValue.split(".");
        if (parts.length > 2) {
            inputValue = parts[0] + "." + parts.slice(1).join("");
        }

        // Limit decimal places to 2 digits
        if (inputValue.includes(".")) {
            const [integerPart, decimalPart] = inputValue.split(".");
            inputValue =
            integerPart + "." + (decimalPart ?? "").slice(0, 2);
        }

        // Enforce maximum input length after processing
        if (inputValue.length > maxLength) {
            inputValue = inputValue.slice(0, maxLength);
        }

        // Convert input string to numeric value (e.g., remove formatting if needed)
        const parsedValue = parseCurrencyInput(inputValue);

        // Update DataGrid cell value
        await apiRef.current.setEditCellValue({
            id,
            field,
            value: parsedValue,
        });
    };

  const displayValue =
    value === null || value === undefined ? "" : String(value);

  const validation = validate(
    validateMaxLength(displayValue, maxLength, labelName),
    required ? validateRequired(displayValue, labelName) : { isValid: true }
  );

  return (
    <TextField
      fullWidth
      variant="standard"
      value={displayValue}
      onChange={handleChange}
      inputRef={inputRef}
      error={!validation.isValid}
      helperText={validation.errorMessage}
      inputProps={{
        inputMode: "numeric",
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
          padding: "8px 0",
        },
      }}
    />
  );
}