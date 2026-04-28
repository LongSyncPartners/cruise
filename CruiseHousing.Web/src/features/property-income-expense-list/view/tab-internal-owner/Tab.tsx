import { Box } from "@mui/material";
import {
  DataGrid,
  GridRowId,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import { useCallback, useMemo, useState } from "react";

import { createTabInternalOwnerColumns } from "./Column";
import { TabInternalOwnerRow } from "../../types";
import { dataGridCommonSx } from "@/features/shared/dataGridCommonSx";
import CustomContextMenu, {
  type CellContextMenuState,
} from "@/features/shared/CustomContextMenu";

type TabInternalOwnerProps = {
  rows: TabInternalOwnerRow[];
  onOpenFloatPanelClick?: (menu: NonNullable<CellContextMenuState>) => void;
  onSelectedRowChange?: (row: TabInternalOwnerRow) => void;
};

export default function TabInternalOwner({
  rows,
  onOpenFloatPanelClick,
  onSelectedRowChange,
}: TabInternalOwnerProps) {
  const [headerNames, setHeaderNames] = useState<Record<string, string>>({});
  const [contextMenu, setContextMenu] = useState<CellContextMenuState>(null);

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const handleCellContextMenu = (
    params: GridRenderCellParams<TabInternalOwnerRow>,
    event: React.MouseEvent<HTMLElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (params.id.toString().includes("total")) return;

    setContextMenu({
      mouseX: event.clientX,
      mouseY: event.clientY - 30,
      rowId: params.id,
      field: params.field,
      row: params.row,
      value: params.value,
    });
  };

  const handleRenameHeader = useCallback((field: string, headerName: string) => {
    setHeaderNames((prev) => ({
      ...prev,
      [field]: headerName,
    }));
  }, []);

  const baseColumns = useMemo(
    () =>
      createTabInternalOwnerColumns({
        onRenameHeader: handleRenameHeader,
        onCellContextMenu: handleCellContextMenu,
      }),
    [handleRenameHeader]
  );

  const columns = useMemo(() => {
    return baseColumns.map((col) => ({
      ...col,
      headerName: headerNames[col.field] ?? col.headerName,
    }));
  }, [baseColumns, headerNames]);

  const selectedRowId = useMemo<GridRowId | undefined>(() => {
    return [...rows]
      .reverse()
      .find(
        (row) =>
          !row.id.toString().includes("total") &&
          row.totalIncomeAmount !== null
      )?.id;
  }, [rows]);

  const handleRowClick = (params: { row: TabInternalOwnerRow }) => {
    if (params.row.id.toString().includes("total")) return;

    onSelectedRowChange?.(params.row);
  };

  return (
    <Box sx={{ width: "auto", height: "auto" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowHeight={40}
        columnHeaderHeight={40}
        getRowClassName={(params) =>
          params.id.toString().includes("total") ? "summary-total-row" : ""
        }
        rowSelectionModel={{
          type: "include",
          ids: selectedRowId ? new Set([selectedRowId]) : new Set(),
        }}
        localeText={{
          noRowsLabel: "データがありません",
          noResultsOverlayLabel: "データがありません",
        }}
        onRowClick={handleRowClick}
        hideFooter
        disableRowSelectionOnClick
        disableColumnMenu
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        sx={[dataGridCommonSx]}
      />

      <CustomContextMenu
        contextMenu={contextMenu}
        onClose={handleCloseContextMenu}
        features={{
          copy: false,
          paste: false,
          pasteBelow: false,
          color: false,
          addRows: false,
          delete: false,
          copyAll: false,
          openFloatingPanel: true,
        }}
        onOpenFloatPanelClick={onOpenFloatPanelClick}
      />
    </Box>
  );
}