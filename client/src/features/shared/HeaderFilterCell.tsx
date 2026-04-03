import * as React from "react";
import {
  Box,
  IconButton,
  InputBase,
  Tooltip,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import ClearIcon from "@mui/icons-material/Clear";
import SwapVertIcon from '@mui/icons-material/SwapVert';

export type SortDirection = "asc" | "desc" | null;

type HeaderFilterCellProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onSort: () => void;
  sortDirection: SortDirection;
  debounceMs?: number;
  placeholder?: string;
};

export default function HeaderFilterCell({
  label,
  value,
  onChange,
  onSort,
  sortDirection,
  debounceMs = 300,
  placeholder = "Filter...",
}: HeaderFilterCellProps) {
  const [inputValue, setInputValue] = React.useState(value);

  React.useEffect(() => {
    setInputValue(value);
  }, [value]);

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      if (inputValue !== value) {
        onChange(inputValue);
      }
    }, debounceMs);

    return () => window.clearTimeout(timer);
  }, [inputValue, value, onChange, debounceMs]);

  const sortIcon =
    sortDirection === "asc" ? (
      <ArrowUpwardIcon fontSize="inherit" />
    ) : sortDirection === "desc" ? (
      <ArrowDownwardIcon fontSize="inherit" />
    ) : (
      <SwapVertIcon fontSize="inherit" />
    );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        pointerEvents: "auto",
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
    
      
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          border: "none",
          bgcolor: "transparent",
        }}
      >
        <Tooltip title="Sort">
          <IconButton
            size="small"
            onClick={(e) => {
                e.stopPropagation();
                onSort();
            }}
            sx={{
                p: 0.25,
                fontSize: 18,
                color : "white",
                zIndex: 10,
                pointerEvents: "auto",
                 // 🔥 remove outline
                outline: "none",

                // 🔥 remove focus border
                "&:focus": {
                outline: "none",
                },

                "&:focus-visible": {
                outline: "none",
                },

                // 🔥 remove background when click
                "&:hover": {
                backgroundColor: "transparent",
                },

                "&.Mui-focusVisible": {
                outline: "none",
                },
            }}
          >
            {sortIcon}
          </IconButton>
        </Tooltip>

        <InputBase
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={label}
          fullWidth
          sx={{
            color : "white",
            "& input::placeholder": {
                opacity: 1
            },
          }}
          inputProps={{
            "aria-label": `Filter ${label}`,
          }}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            e.stopPropagation();
            if (e.key === "Escape") {
              setInputValue("");
            }
          }}
        />

        {inputValue ? (
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setInputValue("");
              onChange("");
            }}
            sx={{ 
                color : "white",
                p: 0.25 
            }}
          >
            <ClearIcon fontSize="inherit" />
          </IconButton>
        ) : null}
      </Box>
    </Box>
  );
}