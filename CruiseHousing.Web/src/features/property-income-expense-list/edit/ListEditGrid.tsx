import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useCallback, useMemo, useState } from "react";

import { createListEditColumns } from "./ListEditColumn";
import { dataGridCommonSx } from "@/features/shared/dataGridCommonSx";
import CustomPagination from "@/features/shared/CustomPagination";
import { ListEditRow } from "../types";
import {
  DETAIL_TAB_VALUES,
  SubjectOption,
  TabOption,
} from "../subjectOptions";

type ListEditGridProps = {
  rows: ListEditRow[];
  detailTabs: TabOption[];
  detailTabValue: number;
  subjectTabs: SubjectOption[];
  subjectTabValue: number;
};

const PAGE_SIZE = 20;

export default function ListEditGrid({
  rows,
  detailTabs,
  detailTabValue,
  subjectTabs,
  subjectTabValue,
}: ListEditGridProps) {
  const [headerNames, setHeaderNames] = useState<Record<string, string>>({});

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: PAGE_SIZE,
  });

  const handleRenameHeader = useCallback((field: string, headerName: string) => {
    setHeaderNames((prev) => ({
      ...prev,
      [field]: headerName,
    }));
  }, []);

  const filteredDetailTabs = useMemo(() => {
    if (detailTabValue === DETAIL_TAB_VALUES.ALL) {
      return detailTabs.filter((tab) => tab.value !== DETAIL_TAB_VALUES.ALL);
    }

    return detailTabs.filter((tab) => tab.value === detailTabValue);
  }, [detailTabs, detailTabValue]);

  const filteredSubjectTabs = useMemo(() => {
    const selectedSubjectValue = subjectTabs[subjectTabValue]?.value;

    if (!selectedSubjectValue || selectedSubjectValue === "all") {
      return subjectTabs.filter((tab) => tab.value !== "all");
    }

    return subjectTabs.filter((tab) => tab.value === selectedSubjectValue);
  }, [subjectTabs, subjectTabValue]);

  const baseColumns = useMemo(
    () =>
      createListEditColumns({
        onRenameHeader: handleRenameHeader,
        detailTabs: filteredDetailTabs,
        subjectTabs: filteredSubjectTabs,
      }),
    [handleRenameHeader, filteredDetailTabs, filteredSubjectTabs]
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
        disableRowSelectionOnClick
        disableColumnMenu
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        pageSizeOptions={[PAGE_SIZE]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        sx={[dataGridCommonSx]}
        slots={{
          footer: () => (
            <CustomPagination
              page={paginationModel.page}
              pageSize={paginationModel.pageSize}
              rowCount={rows.length}
              onPageChange={(newPage) =>
                setPaginationModel((prev) => ({
                  ...prev,
                  page: newPage,
                }))
              }
            />
          ),
        }}
      />
    </Box>
  );
}