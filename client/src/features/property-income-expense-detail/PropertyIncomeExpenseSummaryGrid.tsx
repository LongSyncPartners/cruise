import { Box } from "@mui/material";
import { DataGrid, GridRowId } from "@mui/x-data-grid";

import { dataGridCommonSx } from "../shared/dataGridCommonSx";
import {
  propertyIncomeExpenseSummaryColumns,
  PropertyIncomeExpenseSummaryRow,
} from "./propertyIncomeExpenseSummaryColumns";
import { useMemo } from "react";

export default function PropertyIncomeExpenseSummaryGrid({ rows }: { rows: PropertyIncomeExpenseSummaryRow[]
}) {
    const selectedRowId = useMemo<GridRowId | undefined>(() => {
        return [...rows]
        .reverse()
        .find(
        (row) =>
            !row.id.toString().includes("total") &&
            row.expectedAmount1 !== null
        )?.id;
    }, [rows]);

  return (
    <Box sx={{ width: "auto", height: "auto" }}>
      <DataGrid
        rows={rows}
        columns={propertyIncomeExpenseSummaryColumns}
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