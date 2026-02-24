import * as React from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";

import { usePaintStore } from "../Common/PaintStore";

export default function ColorPaletteGrid({
  value,                 // màu đang chọn: "#rrggbb" hoặc ""
  onChange,              // (color: string) => void
  colors = DEFAULT_COLORS,
  columns = 8,
  showNone = true,
  showHistory = true,
  historySize = 6,
}) {

  const setPaintColor = usePaintStore((s) => s.setPaintColor);
  const setPaintEnabled = usePaintStore((s) => s.setPaintEnabled);

  const pick = (c) => {
    onChange?.(c);
    setPaintColor(c);
    return;
  };

  return (
    <Box sx={{ p: 0.5, width: 320 }}>
      <Box
        sx={{
          mt: 0.75,
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 32px)`,
          gap: 1,
        }}
      >
        {showNone && (
          <Tooltip title="None (clear)" arrow>
            <IconButton
              size="small"
              onClick={() => pick("")}
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1.5,
                border: "1px solid rgba(0,0,0,0.2)",
                position: "relative",
                bgcolor: "transparent",
                outline: value === "" ? "2px solid rgba(0,0,0,0.55)" : "none",
                outlineOffset: 1,
                "&:before": {
                  content: '""',
                  position: "absolute",
                  inset: 6,
                  borderRadius: 1,
                  border: "1px dashed rgba(0,0,0,0.35)",
                },
                "&:after": {
                  content: '""',
                  position: "absolute",
                  left: 7,
                  right: 7,
                  top: 15,
                  height: 2,
                  bgcolor: "rgba(0,0,0,0.5)",
                  transform: "rotate(-25deg)",
                },
              }}
            />
          </Tooltip>
        )}

        {colors.map((c) => (
          <Swatch
            key={c.value}
            color={c.value}
            label={c.name}
            selected={c.value === value}
            onClick={() => pick(c.value)}
          />
        ))}
      </Box>
    </Box>
  );
}

function Swatch({ color, label, selected, onClick }) {
  return (
    <Tooltip title={label || color} arrow>
      <IconButton
        size="small"
        onClick={onClick}
        sx={{
          width: 32,
          height: 32,
          borderRadius: 1.5,
          border: "1px solid rgba(0,0,0,0.15)",
          bgcolor: color,
          outline: selected ? "2px solid rgba(0,0,0,0.55)" : "none",
          outlineOffset: 1,
        }}
      />
    </Tooltip>
  );
}

const DEFAULT_COLORS = [
  { name: "Light Yellow", value: "#fff9c4" },
  { name: "Yellow", value: "#fff59d" },
  { name: "Amber", value: "#ffe082" },
  { name: "Orange", value: "#ffe0b2" },
  { name: "Light Green", value: "#86eb12" },
  { name: "Green", value: "#07f30f" },
  { name: "Teal", value: "#08f5e1" },
  { name: "Light Blue", value: "#bbdefb" },
  { name: "Blue", value: "#c5cae9" },
  { name: "Lavender", value: "#d1c4e9" },
  { name: "Pink", value: "#f8bbd0" },
  { name: "Red", value: "#f70f26" },
  { name: "Grey", value: "#e0e0e0" },
  { name: "Stone", value: "#eeeeee" },
];