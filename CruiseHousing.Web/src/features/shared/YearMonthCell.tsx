import React from "react";
import { GridRenderCellParams } from "@mui/x-data-grid";

type YearMonthCellProps =
  | (GridRenderCellParams & {
      onToggleExecutedState?: (rowId: string | number) => void;
    })
  | {
      value: string | number | null | undefined;
      onToggleExecutedState?: () => void;
    };

const formatYearMonth = (value: unknown, isJapanese: boolean): string => {
  if (!value) return "";

  if (typeof value === "string" && /^\d{6}$/.test(value)) {
    const yyyy = value.slice(0, 4);
    const mm = value.slice(4, 6);
    return isJapanese ? `${yyyy}年${mm}月` : `${yyyy}/${mm}`;
  }

  const date = new Date(value as string | number);
  if (isNaN(date.getTime())) return "";

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");

  return isJapanese ? `${yyyy}年${mm}月` : `${yyyy}/${mm}`;
};

export default function YearMonthCell(props: YearMonthCellProps) {
  const isGridMode = "id" in props;

  const value = props.value;
  const id = isGridMode ? props.id : undefined;
  const row = isGridMode ? props.row : undefined;

  const isGray = Boolean((row as any)?.executedState);

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!value) return;

    if (isGridMode) {
      props.onToggleExecutedState?.(id!);
    } else {
      props.onToggleExecutedState?.();
    }
  };

  return (
    <div
      onDoubleClick={handleDoubleClick}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        padding: "2px 4px",
        backgroundColor: isGray ? "#a8a5a5" : "transparent",
        cursor: "pointer",
      }}
    >
      {formatYearMonth(value, !isGridMode)}
    </div>
  );
}