import { useMemo, useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import {
  DataGrid,
  useGridApiRef,
  type GridColDef,
  type GridRowId,
  type GridFilterModel,
  type GridSortModel,
  type GridRowSelectionModel,
} from "@mui/x-data-grid";

import RefreshIcon from "@mui/icons-material/Refresh";

import { paggingdata } from "./data.dump";
import type { PropertyRow } from "./types";

import CustomPagination from "../shared/CustomPagination";
import { dataGridCommonSx } from "../shared/dataGridCommonSx";
import {
  createFilterableHeader,
  singleSelectContainsOperator,
} from "../shared/createFilterableHeader";

import "./index.style.css";
import LoadingDialog from "../shared/LoadingDialog";
import {
  MANAGEMENT_TYPE_OPTIONS,
  PROCESSING_STATUS_OPTIONS,
  PROPERTY_STATUS_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
} from "./property";
import { getPreviousMonthLabel } from "../shared/utils";
import ProcessingStatusStateDialog from "./ProcessingStatusDialog";
import { usePropertySelectionStore } from "../../stores/propertySelectionStore";

function PropertyDataGrid() {
  const [rows, setRows] = useState<PropertyRow[]>(paggingdata);

  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
  });

  const [sortModel, setSortModel] = useState<GridSortModel>([]);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });

  const [rowCount] = useState(rows.length);

  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>({
      type: "include",
      ids: new Set<GridRowId>(),
    });

  const [openProcessingStatusDialog, setOpenProcessingStatusDialog] =
    useState(false);
  const [propertyCode, setPropertyCode] = useState<string | null>(null);

  const apiRef = useGridApiRef();

  const setSelectedProperty = usePropertySelectionStore(
    (state) => state.setSelectedProperty
  );

  const clearSelectedProperty = usePropertySelectionStore(
    (state) => state.clearSelectedProperty
  );

  useEffect(() => {
    clearSelectedProperty();
  }, [clearSelectedProperty]);

  useEffect(() => {
    setTimeout(() => {
      apiRef.current?.resetRowHeights();
    }, 0);
  }, [apiRef]);

  const renderFilterableHeader = useMemo(
    () =>
      createFilterableHeader({
        filterModel,
        setFilterModel,
        sortModel,
        setSortModel,
        debounceMs: 400,
      }),
    [filterModel, sortModel]
  );

  const handleOpenProcessingStatusDialog = (propertyCode: string) => {
    setOpenProcessingStatusDialog(true);
    setPropertyCode(propertyCode);
  };

  const handleCloseProcessingStatusDialog = () => {
    setOpenProcessingStatusDialog(false);
  };

  const columns = useMemo<GridColDef<PropertyRow>[]>(
    () => [
      {
        field: "propertyCode",
        headerName: "物件番号",
        width: 90,
        editable: false,
        sortable: false,
        filterable: false,
        renderHeader: renderFilterableHeader,
      },
      {
        field: "managementType",
        headerName: "管理種別",
        width: 90,
        editable: false,
        sortable: false,
        filterable: false,
        type: "singleSelect",
        valueOptions: MANAGEMENT_TYPE_OPTIONS,
        filterOperators: [singleSelectContainsOperator],
        renderHeader: renderFilterableHeader,
      },
      {
        field: "propertyType",
        headerName: "建物種別",
        width: 90,
        editable: false,
        sortable: false,
        filterable: false,
        type: "singleSelect",
        valueOptions: PROPERTY_TYPE_OPTIONS,
        filterOperators: [singleSelectContainsOperator],
        renderHeader: renderFilterableHeader,
      },
      {
        field: "managementCompany",
        headerName: "管理会社",
        width: 160,
        editable: false,
        sortable: false,
        filterable: false,
        renderHeader: renderFilterableHeader,
      },
      {
        field: "managementDate",
        headerName: "管理開始～終了日",
        width: 190,
        editable: false,
        sortable: false,
        filterable: false,
        renderHeader: renderFilterableHeader,
      },
      {
        field: "propertyStatus",
        headerName: "物件ステータス",
        width: 140,
        editable: false,
        sortable: false,
        filterable: false,
        type: "singleSelect",
        valueOptions: PROPERTY_STATUS_OPTIONS,
        filterOperators: [singleSelectContainsOperator],
        renderHeader: renderFilterableHeader,
      },
      {
        field: "ownerName",
        headerName: "オーナー名",
        width: 190,
        editable: false,
        sortable: false,
        filterable: false,
        renderHeader: renderFilterableHeader,
      },
      {
        field: "processingStatus",
        headerName: `処理ステータス（${getPreviousMonthLabel()}）`,
        flex: 1,
        minWidth: 280,
        editable: false,
        sortable: false,
        filterable: false,
        type: "singleSelect",
        valueOptions: PROCESSING_STATUS_OPTIONS,
        filterOperators: [singleSelectContainsOperator],
        renderHeader: renderFilterableHeader,
      },
    ],
    [renderFilterableHeader]
  );

  return (
    <Box sx={{ width: "auto", height: 700 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowHeight={50}
        columnHeaderHeight={40}
        className="properties-grid"
        localeText={{
          noRowsLabel: "データがありません",
          noResultsOverlayLabel: "データがありません",
        }}
        initialState={{
          pagination: { paginationModel: { pageSize: 20, page: 0 } },
        }}
        disableColumnMenu
        pageSizeOptions={[20]}
        checkboxSelection={false}
        disableRowSelectionOnClick={false}
        rowSelectionModel={rowSelectionModel}
        onRowSelectionModelChange={(newSelection) => {
          setRowSelectionModel(newSelection);
        }}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        editMode="cell"
        apiRef={apiRef}
        filterModel={filterModel}
        onFilterModelChange={setFilterModel}
        sortModel={sortModel}
        onSortModelChange={setSortModel}
        processRowUpdate={(updatedRow) => {
          setRows((prev) =>
            prev.map((row) => (row.id === updatedRow.id ? updatedRow : row))
          );
          return updatedRow;
        }}
        onProcessRowUpdateError={(error) => {
          console.error(error);
        }}
        sx={[dataGridCommonSx]}
        slots={{
          footer: () => (
            <CustomPagination
              page={paginationModel.page}
              pageSize={paginationModel.pageSize}
              rowCount={rowCount}
              totalCountLabel="総物件数"
              onPageChange={(newPage) =>
                setPaginationModel((prev) => ({
                  ...prev,
                  page: newPage,
                }))
              }
            />
          ),
        }}
        onRowClick={(params) => {
          setSelectedProperty(params.id, params.row.propertyCode);
        }}
        onRowDoubleClick={(params) => {
          setSelectedProperty(params.id, params.row.propertyCode);
          handleOpenProcessingStatusDialog(params.row.propertyCode);
        }}
      />

      <ProcessingStatusStateDialog
        open={openProcessingStatusDialog}
        onClose={handleCloseProcessingStatusDialog}
        propertyCode={propertyCode ?? undefined}
      />
    </Box>
  );
}

export default function Properties() {
  const [loading, setLoading] = useState(false);

  const handleLoading = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="properties-container">
      <div className="properties-common-header">
        <div className="common-header-item" onClick={handleLoading}>
          <RefreshIcon />
          <Typography>最新情報を更新</Typography>
        </div>
      </div>

      <Typography sx={{ fontSize: "150%", fontWeight: "500", paddingBottom: 2 }}>
        物件一覧
      </Typography>

      <div className="properties-grid-contaniner">
        <PropertyDataGrid />
      </div>

      <LoadingDialog open={loading} />
    </div>
  );
}