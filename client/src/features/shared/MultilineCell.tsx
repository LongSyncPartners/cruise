import { GridRenderCellParams } from "@mui/x-data-grid";
import React from "react";


export default function MultilineCell(
  params: GridRenderCellParams
) {
  const { value } = params;

  return (
    <div
      style={{
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: 2,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "normal",
        wordBreak: "break-word",
        lineHeight: 1.4,
      }}
      title={value ?? ""}
    >
      {value ?? ""}
    </div>
  );
}