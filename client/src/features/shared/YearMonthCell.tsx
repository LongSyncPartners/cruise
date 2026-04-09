import React from "react";
import { GridRenderCellParams } from "@mui/x-data-grid";

type YearMonthCellProps = GridRenderCellParams & {
  onToggleExecutedState?: (rowId: string | number) => void;
};

const formatYearMonth = (value: unknown): string => {
  if (!value) return "";

  const date = new Date(value as string | number);
  if (isNaN(date.getTime())) return "";

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");

  return `${yyyy}/${mm}`;
};

export default function YearMonthCell({
  id,
  value,
  row,
  onToggleExecutedState,
}: YearMonthCellProps) {
  const isGray = Boolean(row?.executedState);

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!value) return; // Prevent toggling if no date value
    onToggleExecutedState?.(id);
  };

  return (
    <div
      onDoubleClick={handleDoubleClick}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        padding: "2px 2px",
        backgroundColor: isGray ? "#a8a5a5" : "transparent",
        cursor: "pointer",
      }}
    >
      {formatYearMonth(value)}
    </div>
  );
}