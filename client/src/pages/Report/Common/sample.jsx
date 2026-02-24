import * as React from "react";
import { Box, Popover, IconButton, Tooltip, Button, Stack } from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";
import { DataGrid } from "@mui/x-data-grid";

const COLORS = [
  { name: "None", value: "" },
  { name: "Yellow", value: "#fff59d" },
  { name: "Green", value: "#c8e6c9" },
  { name: "Blue", value: "#bbdefb" },
  { name: "Pink", value: "#f8bbd0" },
  { name: "Orange", value: "#ffe0b2" },
];

function ColorPalette({ value, onPick }) {
  return (
    <Box sx={{ p: 1.25, display: "grid", gridTemplateColumns: "repeat(3, 36px)", gap: 1 }}>
      {COLORS.map((c) => (
        <Tooltip key={c.name} title={c.name} arrow>
          <IconButton
            size="small"
            onClick={() => onPick(c.value)}
            sx={{
              width: 36,
              height: 36,
              border: "1px solid rgba(0,0,0,0.15)",
              bgcolor: c.value || "transparent",
              position: "relative",
              "&:after": c.value === value ? {
                content: '""',
                position: "absolute",
                inset: 6,
                border: "2px solid rgba(0,0,0,0.45)",
                borderRadius: "6px",
              } : undefined,
            }}
          />
        </Tooltip>
      ))}
    </Box>
  );
}

// TODO: thay bằng API thật của bạn
async function saveRowToDb(row) {
  // ví dụ:
  // await fetch(`/api/rows/${row.id}`, { method: "PUT", headers: {...}, body: JSON.stringify(row) });
  console.log("save to DB:", row.id, row.cellColors);
}

export default function GridPaintAndEdit() {
  const [rows, setRows] = React.useState([
    { id: 1, name: "A", amount: 1200, note: "hello", cellColors: {} },
    { id: 2, name: "B", amount: 800, note: "world", cellColors: {} },
    { id: 3, name: "C", amount: 2200, note: "...", cellColors: {} },
  ]);

  // paint mode
  const [paintColor, setPaintColor] = React.useState("");
  const [paintEnabled, setPaintEnabled] = React.useState(false);

  // palette popover
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const openPalette = (e) => setAnchorEl(e.currentTarget);
  const closePalette = () => setAnchorEl(null);

  // Debounce save (đỡ spam API khi click liên tục)
  const saveTimer = React.useRef(null);
  const queueSave = (row) => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => saveRowToDb(row), 400);
  };

  const handleCellClick = (params, event) => {
    if (!paintEnabled) return;

    // Chặn grid xử lý click khác (an toàn)
    event.defaultMuiPrevented = true;

    const { id, field } = params;

    // Nếu bạn muốn không cho tô trên một số cột (vd id, actions) thì filter ở đây
    // if (field === "id") return;

    setRows((prev) => {
      const next = prev.map((r) => {
        if (r.id !== id) return r;

        const current = r.cellColors || {};
        const updated = { ...current };

        if (!paintColor) {
          delete updated[field]; // None => xóa màu
        } else {
          updated[field] = paintColor;
        }

        const newRow = { ...r, cellColors: updated };
        queueSave(newRow); // lưu DB (debounce)
        return newRow;
      });
      return next;
    });
  };

  // Cell editing (Community)
  const processRowUpdate = React.useCallback((newRow) => {
    // Khi user sửa value, vẫn giữ cellColors
    setRows((prev) => prev.map((r) => (r.id === newRow.id ? newRow : r)));
    queueSave(newRow); // cũng có thể lưu DB khi edit
    return newRow;
  }, []);

  // Helper render cell có background theo row.cellColors[field]
  const paintRenderCell = (params) => {
    const bg = (params.row.cellColors && params.row.cellColors[params.field]) || "";
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          px: 1,
          bgcolor: bg || "transparent",
        }}
      >
        {params.value}
      </Box>
    );
  };

  const columns = [
    { field: "name", headerName: "Name", width: 120, editable: true, renderCell: paintRenderCell },
    { field: "amount", headerName: "Amount", width: 140, editable: true, type: "number", renderCell: paintRenderCell },
    { field: "note", headerName: "Note", width: 180, editable: true, renderCell: paintRenderCell },
  ];

  return (
    <Box sx={{ width: 580 }}>
      <Stack direction="row" spacing={1} sx={{ mb: 1, alignItems: "center" }}>
        <Tooltip title="Choose paint color">
          <IconButton onClick={openPalette}>
            <PaletteIcon />
          </IconButton>
        </Tooltip>

        <Button
          variant={paintEnabled ? "contained" : "outlined"}
          onClick={() => setPaintEnabled((v) => !v)}
        >
          {paintEnabled ? "Paint mode: ON" : "Paint mode: OFF"}
        </Button>

        <Box sx={{ fontSize: 13, opacity: 0.8 }}>
          Current: {paintColor ? paintColor : "None"}
        </Box>

        <Box sx={{ fontSize: 13, opacity: 0.8 }}>
          (Edit: double click / Enter / F2)
        </Box>
      </Stack>

      <Box sx={{ height: 360 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          onCellClick={handleCellClick}
          processRowUpdate={processRowUpdate}
          experimentalFeatures={{ newEditingApi: true }} // nếu bạn đang ở v5 cũ; v6+ thường không cần
        />
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={closePalette}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <ColorPalette
          value={paintColor}
          onPick={(c) => {
            setPaintColor(c);
            setPaintEnabled(true); // chọn xong auto bật paint
            closePalette();
          }}
        />
      </Popover>
    </Box>
  );
}