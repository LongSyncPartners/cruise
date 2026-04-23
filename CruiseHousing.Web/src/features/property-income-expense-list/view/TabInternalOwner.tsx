import { Box } from "@mui/material";
import { DataGrid, GridRowId } from "@mui/x-data-grid";
import { useCallback, useMemo, useState } from "react";

import { dataGridCommonSx } from "../../shared/dataGridCommonSx";
import { createTabInternalOwnerColumns } from "./TabInternalOwnerColumn";
import { TabInternalOwnerRow } from "../types";

type TabInternalOwnerProps = {
  rows: TabInternalOwnerRow[];
};

export default function TabInternalOwner({ rows }: TabInternalOwnerProps) {
  const [headerNames, setHeaderNames] = useState<Record<string, string>>({});

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
        hideFooter
        disableRowSelectionOnClick
        disableColumnMenu
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        sx={[dataGridCommonSx]}
      />
    </Box>
  );
}