import { Box } from "@mui/material";
import {
  DataGrid,
  GridCellParams,
  GridColumnHeaderParams,
  GridRowId,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import { useCallback, useEffect, useMemo, useState } from "react";

import { createTabOwnerManagementCompanyColumns } from "./Column";
import { TabOwnerManagementCompanyRow } from "../../types";
import { dataGridCommonSx } from "@/features/shared/dataGridCommonSx";
import CustomContextMenu, {
  type CellContextMenuState,
} from "@/features/shared/CustomContextMenu";
import { DETAIL_TAB_VALUES, SUBJECT_OPTIONS_BY_DETAIL_TAB } from "../../subjectOptions";

type TabOwnerManagementCompanyProps = {
  rows: TabOwnerManagementCompanyRow[];
  onOpenFloatPanelClick?: (menu: NonNullable<CellContextMenuState>) => void;
  onSelectedRowChange?: (row: TabOwnerManagementCompanyRow) => void;
  onGridDoubleClick?:  (params: GridCellParams | GridColumnHeaderParams)  => void;
};

export default function TabOwnerManagementCompany({
  rows,
  onOpenFloatPanelClick,
  onSelectedRowChange,
  onGridDoubleClick
}: TabOwnerManagementCompanyProps) {
  const [headerNames, setHeaderNames] = useState<Record<string, string>>({});
  const [contextMenu, setContextMenu] = useState<CellContextMenuState>(null);
  const [gridRows, setGridRows] = useState<TabOwnerManagementCompanyRow[]>(rows);

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const handleCellContextMenu = (
    params: GridRenderCellParams<TabOwnerManagementCompanyRow>,
    event: React.MouseEvent<HTMLElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (params.id.toString().includes("total")) return;
    if (params.field === "empty") return;

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
      createTabOwnerManagementCompanyColumns({
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
          row.managementEntrust !== null
      )?.id;
  }, [rows]);

  const handleRowClick = (params: {
    row: TabOwnerManagementCompanyRow;
  }) => {
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
                DETAIL_TAB_VALUES.OWNER_MANAGEMENT_COMPANY
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
        rows={gridRows}
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
        onCellDoubleClick={handleGridDoubleClick}
        onColumnHeaderDoubleClick={handleGridDoubleClick}
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