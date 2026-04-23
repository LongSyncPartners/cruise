import { Box } from "@mui/material";
import { DataGrid, GridRowId } from "@mui/x-data-grid";
import { useCallback, useMemo, useState } from "react";

import { dataGridCommonSx } from "../../shared/dataGridCommonSx";
import { createTabOwnerColumns } from "./TabOwnerColumn";
import { TabOwnerRow } from "../types";

type TabOwnerProps = {
  rows: TabOwnerRow[];
};

export default function TabOwner({ rows }: TabOwnerProps) {
  const [headerNames, setHeaderNames] = useState<Record<string, string>>({});

  const handleRenameHeader = useCallback((field: string, headerName: string) => {
    setHeaderNames((prev) => ({ ...prev, [field]: headerName }));
  }, []);

  const baseColumns = useMemo(
    () => createTabOwnerColumns({ onRenameHeader: handleRenameHeader }),
    [handleRenameHeader]
  );

  const columns = useMemo(
    () =>
      baseColumns.map((c) => ({
        ...c,
        headerName: headerNames[c.field] ?? c.headerName,
      })),
    [baseColumns, headerNames]
  );

  const selectedRowId = useMemo<GridRowId | undefined>(() => {
    return [...rows]
      .reverse()
      .find(
        (r) =>
          !r.id.toString().includes("total") &&
          r.totalIncomeAmount !== null
      )?.id;
  }, [rows]);

  return (
    <Box sx={{ width: "auto", height: "auto" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowHeight={40}
        columnHeaderHeight={40}
        getRowClassName={(p) =>
          p.id.toString().includes("total") ? "summary-total-row" : ""
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