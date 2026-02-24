import React, { forwardRef, useMemo } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Divider,
} from "@mui/material";

// Chia mảng thành các chunk
function chunkArray(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

const ROWS_PER_PAGE = 28; // tuỳ font/row height mà chỉnh (26~32)

export const ReportToPrint = forwardRef(function ReportToPrint(
  { title, periodText, totalText, columns, rows },
  ref
) {
  const pages = useMemo(() => chunkArray(rows, ROWS_PER_PAGE), [rows]);

  return (
    <div ref={ref}>
      {pages.map((pageRows, pageIndex) => (
        <div
          key={pageIndex}
          className={`print-page ${pageIndex > 0 ? "break-before" : ""}`}
        >
          {/* Header */}
          <Box display="flex" justifyContent="space-between" alignItems="flex-end">
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {title}
              </Typography>
              <Typography variant="body2">{periodText}</Typography>
            </Box>

            <Box textAlign="right">
              <Typography variant="body2">収支合計</Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {totalText}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 1 }} />

          {/* Table */}
          <Table size="small" sx={{ tableLayout: "fixed" }}>
            <TableHead>
              <TableRow>
                {columns.map((c) => (
                  <TableCell
                    key={c.key}
                    align={c.align ?? "left"}
                    sx={{
                      border: "1px solid #000",
                      fontWeight: 700,
                      fontSize: "10pt",
                      padding: "6px",
                      width: c.width, // ví dụ "18mm", "40mm"...
                      whiteSpace: "nowrap",
                    }}
                  >
                    {c.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {pageRows.map((r) => (
                <TableRow key={r.id}>
                  {columns.map((c) => (
                    <TableCell
                      key={c.key}
                      align={c.align ?? "left"}
                      sx={{
                        border: "1px solid #000",
                        fontSize: "10pt",
                        padding: "6px",
                        whiteSpace: c.wrap ? "normal" : "nowrap",
                        wordBreak: "break-word",
                      }}
                    >
                      {typeof c.render === "function" ? c.render(r) : r[c.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}

              {/* Nếu muốn “đủ chiều cao trang” thì có thể pad thêm dòng trống */}
              {pageRows.length < ROWS_PER_PAGE &&
                Array.from({ length: ROWS_PER_PAGE - pageRows.length }).map((_, i) => (
                  <TableRow key={`empty-${pageIndex}-${i}`}>
                    {columns.map((c) => (
                      <TableCell
                        key={c.key}
                        sx={{ border: "1px solid #000", padding: "6px" }}
                      >
                        &nbsp;
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          {/* Footer */}
          <Box display="flex" justifyContent="space-between" mt={1}>
            <Typography variant="caption">ページ {pageIndex + 1} / {pages.length}</Typography>
            <Typography variant="caption">Printed: {new Date().toLocaleString()}</Typography>
          </Box>
        </div>
      ))}
    </div>
  );
});
