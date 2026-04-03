import { useEffect, useState, type KeyboardEvent, type ChangeEvent } from "react";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

type CustomPaginationProps = {
  page: number; // 0-based
  pageSize: number;
  rowCount: number;
  totalCountLabel?: string;
  onPageChange: (page: number) => void; // 0-based
};

const CustomPagination = ({
  page,
  pageSize,
  rowCount,
  totalCountLabel,
  onPageChange,
}: CustomPaginationProps) => {
  const pageCount = Math.max(1, Math.ceil(rowCount / pageSize));

  // input display  1-based for user
  const [pageInput, setPageInput] = useState<string>(String(page + 1));

  // when page ngoài change, sync input
  useEffect(() => {
    setPageInput(String(page + 1));
  }, [page]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    // validate
    if (/^\d*$/.test(value)) {
      setPageInput(value);
    }
  };

  const commitPageChange = () => {
    if (pageInput.trim() === "") {
      setPageInput(String(page + 1));
      return;
    }

    let nextPage = Number(pageInput);

    if (Number.isNaN(nextPage)) {
      setPageInput(String(page + 1));
      return;
    }

    // clamp from 1 to pageCount
    if (nextPage < 1) nextPage = 1;
    if (nextPage > pageCount) nextPage = pageCount;

    setPageInput(String(nextPage));

    // change to 0-based before call out
    if (nextPage - 1 !== page) {
      onPageChange(nextPage - 1);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      commitPageChange();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "left",
        gap: 1,
        px: 2,
        py: 1,
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <IconButton
        onClick={() => onPageChange(page - 1)}
        disabled={page === 0 || rowCount === 0}
        size="small"
        disableRipple
      >
        <ChevronLeftIcon />
      </IconButton>

      <TextField
        value={pageInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={commitPageChange}
        size="small"
        variant="outlined"
        inputProps={{
          inputMode: "numeric",
          style: {
            textAlign: "center",
            padding: "6px 8px",
            width: "48px",
          },
        }}
        sx={{
          width: 64,
          "& .MuiOutlinedInput-root": {
            height: 32,
          },
        }}
      />

      <Typography fontSize={14}>/ {pageCount}</Typography>

      <IconButton
        onClick={() => onPageChange(page + 1)}
        disabled={page + 1 >= pageCount || rowCount === 0}
        size="small"
        disableRipple
      >
        <ChevronRightIcon />
      </IconButton>

      <Typography fontSize={14} sx={{ ml: 2 }}>
        {totalCountLabel || "データ件数"}：{rowCount}
      </Typography>
    </Box>
  );
};

export default CustomPagination;