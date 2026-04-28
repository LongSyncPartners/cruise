import React from "react";
import type {
  GridColDef,
  GridRenderCellParams,
  GridValidRowModel,
} from "@mui/x-data-grid";

export const withContextMenu = <TRow extends GridValidRowModel>(
  col: GridColDef<TRow>,
  onCellContextMenu: (
    params: GridRenderCellParams<TRow>,
    event: React.MouseEvent<HTMLElement>
  ) => void
): GridColDef<TRow> => {
  const originalRenderCell = col.renderCell;

  return {
    ...col,
    renderCell: (params) => (
      <div
        onContextMenu={(event) => onCellContextMenu(params, event)}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        {originalRenderCell
          ? originalRenderCell(params)
          : params.formattedValue ?? params.value ?? ""}
      </div>
    ),
  };
};