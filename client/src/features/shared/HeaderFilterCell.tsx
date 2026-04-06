import * as React from "react";
import {
  Box,
  FormControl,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ClearIcon from "@mui/icons-material/Clear";
import SwapVertIcon from "@mui/icons-material/SwapVert";

export type SortDirection = "asc" | "desc" | null;

type FilterOption = {
  value: string;
  label: string;
};

type HeaderFilterCellProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onSort: () => void;
  sortDirection: SortDirection;
  debounceMs?: number;
  placeholder?: string;
  filterType?: "text" | "select";
  options?: FilterOption[];
};

export default function HeaderFilterCell({
  label,
  value,
  onChange,
  onSort,
  sortDirection,
  debounceMs = 300,
  placeholder = "Filter...",
  filterType = "text",
  options = [],
}: HeaderFilterCellProps) {
  const [inputValue, setInputValue] = React.useState(value);

  React.useEffect(() => {
    setInputValue(value);
  }, [value]);

  React.useEffect(() => {
    if (filterType !== "text") return;

    const timer = window.setTimeout(() => {
      if (inputValue !== value) {
        onChange(inputValue);
      }
    }, debounceMs);

    return () => window.clearTimeout(timer);
  }, [inputValue, value, onChange, debounceMs, filterType]);

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
      onClick={(e) => e.stopPropagation()}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          border: "none",
          bgcolor: "transparent",
          gap: 0,
          width: "100%",
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
              color: "white",
              zIndex: 10,
              pointerEvents: "auto",
              outline: "none",
              "&:focus": { outline: "none" },
              "&:focus-visible": { outline: "none" },
              "&:hover": { backgroundColor: "transparent" },
              "&.Mui-focusVisible": { outline: "none" },
            }}
          >
            {sortIcon}
          </IconButton>
        </Tooltip>

        {filterType === "select" ? (
          <FormControl size="small" fullWidth>
            <Select
              value={value}
              displayEmpty
              IconComponent={() => null}
              onChange={(e) => {
                onChange(String(e.target.value));
              }}
              onClick={(e) => e.stopPropagation()}
              sx={{
                color: "white",
                fontSize: 14,
                minHeight: 32,
                "& .MuiSelect-select": {
                  paddingRight: "0px !important",
                  paddingLeft: "0px",
                  paddingTop: "2px",
                  paddingBottom: "2px",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& .MuiSvgIcon-root": {
                  color: "white",
                },
                p : 0
              }}
              renderValue={(selected) =>
                selected ? String(selected) : label
              }
            >
              <MenuItem value="">
                <em>すべて</em>
              </MenuItem>

              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <InputBase
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={label || placeholder}
            fullWidth
            sx={{
              color: "white",
              "& input::placeholder": {
                opacity: 1,
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
        )}

        {value ? (
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setInputValue("");
              onChange("");
            }}
            sx={{
              color: "white",
              p: 0.25,
            }}
          >
            <ClearIcon fontSize="inherit" />
          </IconButton>
        ) : null}
      </Box>
    </Box>
  );
}