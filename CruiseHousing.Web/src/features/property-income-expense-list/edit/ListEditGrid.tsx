import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useCallback, useMemo, useState } from "react";

import { createListEditColumns } from "./ListEditColumn";
import { dataGridCommonSx } from "@/features/shared/dataGridCommonSx";
import { ListEditRow } from "../types";


type ListEditGridProps = {
  rows: ListEditRow[];
};

export default function ListEditGrid({ rows }: ListEditGridProps) {
  const [headerNames, setHeaderNames] = useState<Record<string, string>>({});

  const handleRenameHeader = useCallback((field: string, headerName: string) => {
    setHeaderNames((prev) => ({
      ...prev,
      [field]: headerName,
    }));
  }, []);

  const baseColumns = useMemo(
    () =>
      createListEditColumns({
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

  return (
    <Box sx={{ width: "auto", height: 520 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowHeight={40}
        columnHeaderHeight={40}
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