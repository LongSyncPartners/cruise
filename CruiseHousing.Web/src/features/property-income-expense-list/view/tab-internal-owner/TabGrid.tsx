import { Box } from "@mui/material";
import {
  DataGrid,
  GridCellParams,
  GridColumnHeaderParams,
  GridRowId,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import { useCallback, useEffect, useMemo, useState } from "react";

import { createTabInternalOwnerColumns } from "./Column";
import { TabInternalOwnerRow } from "../../types";
import { dataGridCommonSx } from "@/features/shared/dataGridCommonSx";
import CustomContextMenu, {
  type CellContextMenuState,
} from "@/features/shared/CustomContextMenu";
import { DETAIL_TAB_VALUES, SUBJECT_OPTIONS_BY_DETAIL_TAB } from "../../subjectOptions";

type TabInternalOwnerProps = {
  rows: TabInternalOwnerRow[];
  onOpenFloatPanelClick?: (menu: NonNullable<CellContextMenuState>) => void;
  onSelectedRowChange?: (row: TabInternalOwnerRow) => void;
  onGridDoubleClick?:  (params: GridCellParams | GridColumnHeaderParams)  => void;
};

export default function TabInternalOwner({
  rows,
  onOpenFloatPanelClick,
  onSelectedRowChange,
  onGridDoubleClick
}: TabInternalOwnerProps) {
  const [headerNames, setHeaderNames] = useState<Record<string, string>>({});
  const [contextMenu, setContextMenu] = useState<CellContextMenuState>(null);
  const [gridRows, setGridRows] = useState<TabInternalOwnerRow[]>(rows);

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

  const handleToggleExecutedState = useCallback((rowId: GridRowId) => {
      setGridRows((prev) =>
        prev.map((row) =>
          row.id === rowId
            ? { ...row, executedState: !row.executedState }
            : row
        )
      );
    }, []);
  
    const handleGridDoubleClick = useCallback(
      (params: GridCellParams | GridColumnHeaderParams) => {
        const columnField = params.field;
  
        if (columnField === "yearMonth") {
          if ("id" in params) {
            handleToggleExecutedState(params.id);
          }
          return;
        }
  
        const editableSubjects =
                SUBJECT_OPTIONS_BY_DETAIL_TAB[
                  DETAIL_TAB_VALUES.INTERNAL_OWNER
                ];
  
        if (editableSubjects.some((item) => item.value === columnField)) {
          onGridDoubleClick?.(params);
        }
      },
      [handleToggleExecutedState, onGridDoubleClick]
    );
  
  useEffect(() => {
    setGridRows(rows);
  }, [rows]);

  return (
    <Box sx={{ width: "auto", height: "auto" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowHeight={30}
        columnHeaderHeight={30}
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
        onCellDoubleClick={(params) => onGridDoubleClick?.(params)}
        onColumnHeaderDoubleClick={(params) => onGridDoubleClick?.(params)}
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