import * as React from "react";
import {
  GridRenderEditCellParams,
  useGridApiContext,
} from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";

import { validate, validateRequired } from "./validators";

type DateEditCellProps = GridRenderEditCellParams & {
  required?: boolean;
  labelName?: string;
};

const formatToInputDate = (value: unknown): string => {
  if (!value) return "";

  const date = new Date(value as string | number);
  if (isNaN(date.getTime())) return "";

  return date.toISOString().split("T")[0]; // yyyy-MM-dd (input type=date)
};

export default function DateEditCell(props: DateEditCellProps) {
  const {
    id,
    field,
    value,
    hasFocus,
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
    const inputValue = event.target.value; // yyyy-MM-dd

    await apiRef.current.setEditCellValue({
      id,
      field,
      value: inputValue,
    });
  };

  const displayValue = formatToInputDate(value);

  const validation = validate(
    required
      ? validateRequired(displayValue, labelName)
      : { isValid: true }
  );

  return (
    <TextField
      fullWidth
      type="date"
      variant="standard"
      value={displayValue}
      onChange={handleChange}
      inputRef={inputRef}
      error={!validation.isValid}
      helperText={validation.errorMessage}
      sx={{
        height: "100%",
        "& .MuiInputBase-root": {
          padding: 0,
          height: "100%",
          alignItems: "center",
        },
      }}
    />
  );
}