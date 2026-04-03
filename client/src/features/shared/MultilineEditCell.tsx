import * as React from "react";
import {
  GridRenderEditCellParams,
  useGridApiContext,
} from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";

type MultilineEditCellProps = GridRenderEditCellParams & {
  minRows?: number;
  maxRows?: number;
};

export default function MultilineEditCell(
  props: MultilineEditCellProps
) {
  const {
    id,
    field,
    value,
    hasFocus,
    minRows = 2,
    maxRows = 6,
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
    await apiRef.current.setEditCellValue({
      id,
      field,
      value: event.target.value,
    });
  };

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
        event.stopPropagation();
      }}
    />
  );
}