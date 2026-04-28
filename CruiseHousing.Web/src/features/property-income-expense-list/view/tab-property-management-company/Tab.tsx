import { Box } from "@mui/material";
import {
  DataGrid,
  GridCellParams,
  GridColumnHeaderParams,
  GridRowId,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import { useCallback, useMemo, useState } from "react";

import { dataGridCommonSx } from "../../../shared/dataGridCommonSx";
import { createTabPropertyManagementCompanyColumns } from "./Column";
import { TabPropertyManagementCompanyRow } from "../../types";
import CustomContextMenu, {
  type CellContextMenuState,
} from "@/features/shared/CustomContextMenu";
import { DETAIL_TAB_VALUES, SUBJECT_OPTIONS_BY_DETAIL_TAB } from "../../subjectOptions";

type TabPropertyManagementCompanyProps = {
  rows: TabPropertyManagementCompanyRow[];
  onOpenFloatPanelClick?: (menu: NonNullable<CellContextMenuState>) => void;
  onSelectedRowChange?: (row: TabPropertyManagementCompanyRow) => void;
  onGridDoubleClick?:  (params: GridCellParams | GridColumnHeaderParams)  => void;
};

export default function TabPropertyManagementCompany({
  rows,
  onOpenFloatPanelClick,
  onSelectedRowChange,
  onGridDoubleClick
}: TabPropertyManagementCompanyProps) {
  const [headerNames, setHeaderNames] = useState<Record<string, string>>({});
  const [contextMenu, setContextMenu] = useState<CellContextMenuState>(null);

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const handleCellContextMenu = (
    params: GridRenderCellParams<TabPropertyManagementCompanyRow>,
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
      createTabPropertyManagementCompanyColumns({
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
          !row.id.toString().includes("total") && row.rentAmount !== null
      )?.id;
  }, [rows]);


  const handleRowClick = (params: { row: TabPropertyManagementCompanyRow }) => {
    if (params.row.id.toString().includes("total")) return;

    onSelectedRowChange?.(params.row);
  };

  const handleGridDoubleClick = useCallback(
    (params: GridCellParams | GridColumnHeaderParams) => {
      const columnField = params.field;
      const editableSubjects = SUBJECT_OPTIONS_BY_DETAIL_TAB[DETAIL_TAB_VALUES.PROPERTY_MANAGEMENT_COMPANY]
      if (editableSubjects.some(item => item.value === columnField)) {
        onGridDoubleClick?.(params);
      };
    },
    [onGridDoubleClick]
  );

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