import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useCallback, useMemo, useState } from "react";

import { createListEditColumns } from "./ListEditColumn";
import { dataGridCommonSx } from "@/features/shared/dataGridCommonSx";
import { ListEditRow, SubjectTabInfo } from "../types";
import { DETAIL_TAB_VALUES, SubjectOption, TabOption } from "../subjectOptions";


type ListEditGridProps = {
  rows: ListEditRow[];
  detailTabs: TabOption[];
  detailTabValue: number;
  subjectTabs: SubjectOption[];
  subjectTabValue: number;
};

export default function ListEditGrid({ rows, detailTabs, detailTabValue, subjectTabs, subjectTabValue }: ListEditGridProps) {
  const [headerNames, setHeaderNames] = useState<Record<string, string>>({});

  const handleRenameHeader = useCallback((field: string, headerName: string) => {
    setHeaderNames((prev) => ({
      ...prev,
      [field]: headerName,
    }));
  }, []);

  const filteredDetailTabs = useMemo(() => {
    if (detailTabValue === DETAIL_TAB_VALUES.ALL) {
      return detailTabs.filter(
        (tab) => tab.value !== DETAIL_TAB_VALUES.ALL
      );
    }

    return detailTabs.filter(
      (tab) => tab.value === detailTabValue
    );
  }, [detailTabValue]);

  const filteredSubjectTabs = useMemo(() => {
    if (subjectTabValue === 0) {
      // 0 = ALL
      return subjectTabs.filter((tab) => tab.value !== "all");
    }

    return subjectTabs.filter(
      (_, index) => index === subjectTabValue
    );
  }, [detailTabValue, subjectTabValue]);

  const baseColumns = useMemo(
    () =>
      createListEditColumns({
        onRenameHeader: handleRenameHeader,
        detailTabs: filteredDetailTabs,
        subjectTabs: filteredSubjectTabs
      }),
    [handleRenameHeader, detailTabValue,  subjectTabValue]
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
        getRowHeight={() => "auto"}
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