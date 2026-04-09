import * as React from "react";
import {
  GridRenderEditCellParams,
  useGridApiContext,
} from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import { validate, validateMaxLength, validateRequired } from "./validators";

type MultilineEditCellProps = GridRenderEditCellParams & {
  minRows?: number;
  maxRows?: number;
  maxLength?: number;
  required?: boolean;
  lablelName?: string;
};

export default function MultilineEditCell(
  props: MultilineEditCellProps
) {
  const {
    id,
    field,
    lablelName,
    value,
    hasFocus,
    minRows = 2,
    maxRows = 5,
    maxLength = 100,
    required = false,
  } = props;

  const apiRef = useGridApiContext();
  const inputRef = React.useRef<HTMLTextAreaElement | null>(null);

  React.useEffect(() => {
    if (hasFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [hasFocus]);

  const handleChange = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {

    let value = event.target.value;

    if (value.length > maxLength) {
      value = value.slice(0, maxLength);
    }

    await apiRef.current.setEditCellValue({
      id,
      field,
      value,
    });
  };

  const validation = validate(
    validateMaxLength(value || "", maxLength, lablelName),
    required ? validateRequired(value, lablelName) : { isValid: true }
  );

  return (
    <TextField
      fullWidth
      multiline
      minRows={minRows}
      maxRows={maxRows}
      variant="standard"
      value={value ?? ""}
      onChange={handleChange}
      inputRef={inputRef}
      sx={{
        height: "100%",
        "& .MuiInputBase-root": {
          padding: 0,
          height: "100%",
          alignItems: "flex-start",
        },
        "& .MuiInputBase-input": {
          whiteSpace: "pre-wrap",
          overflow: "auto",
          lineHeight: 1.4,
          padding: "8px 0",
        },
      }}
      onKeyDown={(event) => {
        // cancel Enter event 
        // event.stopPropagation();
      }}
      error={!validation.isValid}
      helperText={validation.errorMessage}
    />
  );
}