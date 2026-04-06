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

import type { PropertyRow } from "./types";

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
import { usePropertiesGridStore } from "@/stores/propertiesGridStore";
import PropertiesPaginationFooter from "./PropertiesPaginationFooter";
import { useProperties } from "@/hooks/useProperties";

function PropertyDataGrid() {
  const [openProcessingStatusDialog, setOpenProcessingStatusDialog] =
    useState(false);
  const [dialogPropertyCode, setDialogPropertyCode] = useState<string | null>(
    null
  );
  const [localRows, setLocalRows] = useState<PropertyRow[]>([]);

  const apiRef = useGridApiRef();

  const { data } = useProperties();

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

  useEffect(() => {
    clearSelectedProperty();
  }, [clearSelectedProperty]);

  useEffect(() => {
    setLocalRows(data ?? []);
  }, [data]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      apiRef.current?.resetRowHeights();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [apiRef, localRows]);

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
    setLocalRows((prevRows) =>
      prevRows.map((row) => (row.id === updatedRow.id ? updatedRow : row))
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
      setRowSelectionModel({
        type: "include",
        ids: new Set([params.id]),
      });

      setSelectedProperty(params.id, params.row.propertyCode);
      handleOpenProcessingStatusDialog(params.row.propertyCode);
    },
    [handleOpenProcessingStatusDialog, setRowSelectionModel, setSelectedProperty]
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
        rows={localRows}
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
            <PropertiesPaginationFooter
              paginationModel={paginationModel}
              setPaginationModel={setPaginationModel}
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
  const { isLoading, isFetching, refetch } = useProperties();

  const resetGridView = usePropertiesGridStore((state) => state.resetGridView);

  const handleRefresh = useCallback(async () => {
    await refetch();
    resetGridView();
  }, [refetch, resetGridView]);

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

      <LoadingDialog open={isLoading || isFetching} />
    </div>
  );
}