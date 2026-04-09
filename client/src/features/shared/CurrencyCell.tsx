import React from "react";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { formatUSD } from "./utils";

export default function CurrencyCell(
  params: GridRenderCellParams
) {
  const value = Number(params.value ?? 0);

  return (
    <span style={{ color: value < 0 ? "red" : "inherit" }}>
      {formatUSD(value)}
    </span>
  );
}