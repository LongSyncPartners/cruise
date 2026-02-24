import * as React from "react";
import { Box, Stack, Typography, Button, FormControlLabel, Switch } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

/**
 * Parse Excel/Sheets clipboard text (TSV):
 * - rows separated by \n (or \r\n)
 * - cols separated by \t
 */
function parseTSV(tsv) {
  const lines = tsv.replace(/\r/g, "").split("\n");

  // remove trailing empty lines
  while (lines.length && lines[lines.length - 1] === "") lines.pop();

  return lines.map((line) => line.split("\t"));
}

function toIntMaybe(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export default function Dashboard() {
  const [appendMode, setAppendMode] = React.useState(false);

  const [rows, setRows] = React.useState([
    { id: 1, name: "A", age: 20 },
    { id: 2, name: "B", age: 30 },
    { id: 3, name: "C", age: 40 },
  ]);

  const columns = React.useMemo(
    () => [
      { field: "id", headerName: "ID", width: 90 },
      { field: "name", headerName: "Name", flex: 1, minWidth: 150, editable: true },
      { field: "age", headerName: "Age", width: 120, type: "number", editable: true },
    ],
    []
  );

  const handlePaste = React.useCallback(
    (e) => {
      const text = e.clipboardData?.getData("text/plain");
      if (!text) return;
       
      // Chỉ xử lý khi giống dữ liệu bảng (có tab hoặc newline)
      const looksLikeTable = text.includes("\t") || text.includes("\n");
      if (!looksLikeTable) return;
      e.preventDefault();

      const matrix = parseTSV(text);

      // Map TSV -> row object theo thứ tự cột: id, name, age
      const parsedRows = matrix
        .filter((r) => r.some((cell) => String(cell ?? "").trim() !== ""))
        .map((r, idx) => {
          const idRaw = (r[0] ?? "").trim();
          return {
            id: idRaw !== "" ? toIntMaybe(idRaw) ?? `tmp-${Date.now()}-${idx}` : `tmp-${Date.now()}-${idx}`,
            name: (r[1] ?? "").trim(),
            age: r[2] !== undefined && String(r[2]).trim() !== "" ? toIntMaybe(String(r[2]).trim()) : null,
          };
        });

      setRows((prev) => {
        if (!appendMode) return parsedRows;

        // Append: tránh trùng id (nếu trùng thì tạo id mới)
        const existing = new Set(prev.map((x) => x.id));
        const safe = parsedRows.map((x, i) => (existing.has(x.id) ? { ...x, id: `dup-${Date.now()}-${i}` } : x));
        return [...prev, ...safe];
      });
    },
    [appendMode]
  );

  const handleClear = () => setRows([]);

  return (
    <Box sx={{ p: 2 }}>
      <Stack spacing={1.5}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2}>
          <Typography variant="h6">Dashboard</Typography>

          <Stack direction="row" alignItems="center" gap={1}>
            <FormControlLabel
              control={
                <Switch
                  checked={appendMode}
                  onChange={(e) => setAppendMode(e.target.checked)}
                />
              }
              label={appendMode ? "Append mode" : "Replace mode"}
            />
            <Button variant="outlined" onClick={handleClear}>
              Clear
            </Button>
          </Stack>
        </Stack>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Copy từ Excel/Google Sheets (dạng bảng) rồi click vào vùng grid và nhấn <b>Ctrl+V</b>.
          (TSV sẽ được parse theo thứ tự: <b>ID</b>, <b>Name</b>, <b>Age</b>)
        </Typography>

        {/* Paste target */}
        <Box
          tabIndex={0}
          onPaste={handlePaste}
          sx={{
            height: 360,
            outline: "none",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 1,
            overflow: "hidden",
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[5, 10, 25, 50]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10, page: 0 } },
            }}
            sx={{
              border: "none",
            }}
          />
        </Box>
      </Stack>
    </Box>
  );
}
