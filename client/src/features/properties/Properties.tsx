import { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import {
  DataGrid,
  useGridApiRef,
  type GridColDef,
  type GridPaginationModel,
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
import { usePropertiesGridStore, PropertiesGridState } from "@/stores/propertiesGridStore";

function PropertyDataGrid() {
  const [rows, setRows] = useState<PropertyRow[]>(paggingdata);
  const [openProcessingStatusDialog, setOpenProcessingStatusDialog] =
    useState(false);
  const [dialogPropertyCode, setDialogPropertyCode] = useState<string | null>(
    null
  );

  const apiRef = useGridApiRef();

  const setSelectedProperty = usePropertySelectionStore(
    (state) => state.setSelectedProperty
  );
  const clearSelectedProperty = usePropertySelectionStore(
    (state) => state.clearSelectedProperty
  );

  const filterModel = usePropertiesGridStore((state) => state.filterModel);
  const sortModel = usePropertiesGridStore((state) => state.sortModel);
  const paginationModel = usePropertiesGridStore(
    (state) => state.paginationModel
  );
  const rowSelectionModel = usePropertiesGridStore(
    (state) => state.rowSelectionModel
  );

  const setFilterModel = usePropertiesGridStore((state) => state.setFilterModel);
  const setSortModel = usePropertiesGridStore((state) => state.setSortModel);
  const setPaginationModel = usePropertiesGridStore(
    (state) => state.setPaginationModel
  );
  const setRowSelectionModel = usePropertiesGridStore(
    (state) => state.setRowSelectionModel
  );

  const rowCount = rows.length;

  useEffect(() => {
    clearSelectedProperty();
  }, [clearSelectedProperty]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      apiRef.current?.resetRowHeights();
    }, 0);

    return () => window.clearTimeout(timer);
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
    [filterModel, setFilterModel, sortModel, setSortModel]
  );

  const handleOpenProcessingStatusDialog = useCallback(
    (propertyCode: string) => {
      setDialogPropertyCode(propertyCode);
      setOpenProcessingStatusDialog(true);
    },
    []
  );

  const handleCloseProcessingStatusDialog = useCallback(() => {
    setOpenProcessingStatusDialog(false);
  }, []);

  const handleRowSelectionModelChange = useCallback(
    (newSelection: GridRowSelectionModel) => {
      setRowSelectionModel(newSelection);
    },
    [setRowSelectionModel]
  );

  const handlePaginationModelChange = useCallback(
    (newModel: GridPaginationModel) => {
      setPaginationModel(newModel);
    },
    [setPaginationModel]
  );

  const handleProcessRowUpdate = useCallback((updatedRow: PropertyRow) => {
    setRows((prev) =>
      prev.map((row) => (row.id === updatedRow.id ? updatedRow : row))
    );
    return updatedRow;
  }, []);

  const handleRowClick = useCallback(
    (params: { id: PropertyRow["id"]; row: PropertyRow }) => {
      setSelectedProperty(params.id, params.row.propertyCode);
    },
    [setSelectedProperty]
  );

  const handleRowDoubleClick = useCallback(
    (params: { id: PropertyRow["id"]; row: PropertyRow }) => {
      setSelectedProperty(params.id, params.row.propertyCode);
      handleOpenProcessingStatusDialog(params.row.propertyCode);
    },
    [handleOpenProcessingStatusDialog, setSelectedProperty]
  );

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
        width: 100,
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
        width: 100,
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
        minWidth: 230,
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
        rowHeight={45}
        columnHeaderHeight={40}
        className="properties-grid"
        localeText={{
          noRowsLabel: "データがありません",
          noResultsOverlayLabel: "データがありません",
        }}
        disableColumnMenu
        pageSizeOptions={[20]}
        checkboxSelection={false}
        disableRowSelectionOnClick={false}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        editMode="cell"
        apiRef={apiRef}
        sx={[dataGridCommonSx]}
        rowSelectionModel={rowSelectionModel}
        onRowSelectionModelChange={handleRowSelectionModelChange}
        paginationModel={paginationModel}
        onPaginationModelChange={handlePaginationModelChange}
        filterModel={filterModel}
        onFilterModelChange={setFilterModel}
        sortModel={sortModel}
        onSortModelChange={setSortModel}
        processRowUpdate={handleProcessRowUpdate}
        onProcessRowUpdateError={console.error}
        slots={{
          footer: () => (
            <CustomPagination
              page={paginationModel.page}
              pageSize={paginationModel.pageSize}
              rowCount={rowCount}
              totalCountLabel="総物件数"
              onPageChange={(newPage) =>
                setPaginationModel({
                  ...paginationModel,
                  page: newPage,
                })
              }
            />
          ),
        }}
        onRowClick={handleRowClick}
        onRowDoubleClick={handleRowDoubleClick}
      />

      <ProcessingStatusStateDialog
        open={openProcessingStatusDialog}
        onClose={handleCloseProcessingStatusDialog}
        propertyCode={dialogPropertyCode ?? undefined}
      />
    </Box>
  );
}

export default function Properties() {
  const [loading, setLoading] = useState(false);

  const handleRefresh = useCallback(async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="properties-container">
      <div className="properties-common-header">
        <div className="common-header-item" onClick={handleRefresh}>
          <RefreshIcon />
          <Typography>最新情報を更新</Typography>
        </div>
      </div>

      <Typography sx={{ fontSize: "150%", fontWeight: 500, paddingBottom: 2 }}>
        物件一覧
      </Typography>

      <div className="properties-grid-contaniner">
        <PropertyDataGrid />
      </div>

      <LoadingDialog open={loading} />
    </div>
  );
}