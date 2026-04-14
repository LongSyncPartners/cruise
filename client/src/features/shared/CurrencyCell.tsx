import React from "react";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { formatUSD } from "./utils";

type CurrencyCellProps =
  | (GridRenderCellParams & {
      showZero?: boolean;
      showNotZeroBackgroundColor?: boolean;
    })
  | {
      value: number | null | undefined;
      showZero?: boolean;
      showNotZeroBackgroundColor?: boolean;
    };

export default function CurrencyCell(props: CurrencyCellProps) {
  const rawValue = props.value;
  const showZero = props.showZero ?? false;
  const showNotZeroBackgroundColor = props.showNotZeroBackgroundColor ?? false;

  // ❗ 1. null / undefined →  blank
  if (rawValue === null || rawValue === undefined) {
    return <span />;
  }

  const value = Number(rawValue);

  // ❗ 2. 0 → blank (if showZero = false)
  if (!showZero && value === 0) {
    return <span />;
  }

  const display = formatUSD(value, { hideZero: false });

  return (
     <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",      // 👉 vertical center
      justifyContent: "flex-end", // 👉 align right
      paddingRight: 8,            // 👉 khoảng cách cho đẹp
      color: value < 0 ? "red" : "inherit",
      backgroundColor : showNotZeroBackgroundColor && value !== 0 ? "#f0ee8a" : "transparent",
    }}
  >
    {display}
  </div>
  );
}