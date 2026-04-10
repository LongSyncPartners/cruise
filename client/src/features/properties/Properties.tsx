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
import { createPropertyColumns } from "./propertyColumns";

/**
 * PropertyDataGrid
 *
 * Main grid component for displaying property list.
 * Handles:
 * - Data rendering
 * - Filtering / sorting / pagination
 * - Row selection
 * - Cell editing
 * - Dialog interaction
 */
function PropertyDataGrid() {
  // Dialog state for processing status
  const [openProcessingStatusDialog, setOpenProcessingStatusDialog] =
    useState(false);
  const [dialogPropertyCode, setDialogPropertyCode] = useState<string | null>(
    null
  );

  // Local editable rows (UI state)
  const [localRows, setLocalRows] = useState<PropertyRow[]>([]);

  // DataGrid API reference (used for manual control like resetting row height)
  const apiRef = useGridApiRef();

  // Fetch data using React Query
  const { data } = useProperties();

  // Zustand store: selected property
  const setSelectedProperty = usePropertySelectionStore(
    (state) => state.setSelectedProperty
  );
  const clearSelectedProperty = usePropertySelectionStore(
    (state) => state.clearSelectedProperty
  );

  // Zustand store: grid states
  const filterModel = usePropertiesGridStore((state) => state.filterModel);
  const sortModel = usePropertiesGridStore((state) => state.sortModel);
  const paginationModel = usePropertiesGridStore(
    (state) => state.paginationModel
  );
  const rowSelectionModel = usePropertiesGridStore(
    (state) => state.rowSelectionModel
  );

  // Zustand setters
  const setFilterModel = usePropertiesGridStore((state) => state.setFilterModel);
  const setSortModel = usePropertiesGridStore((state) => state.setSortModel);
  const setPaginationModel = usePropertiesGridStore(
    (state) => state.setPaginationModel
  );
  const setRowSelectionModel = usePropertiesGridStore(
    (state) => state.setRowSelectionModel
  );

  /**
   * Sync fetched data into local editable rows
   */
  useEffect(() => {
    setLocalRows(data ?? []);
  }, [data]);

  /**
   * Reset row height after data changes
   * (fix for auto height rendering issues)
   */
  useEffect(() => {
    const timer = window.setTimeout(() => {
      apiRef.current?.resetRowHeights();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [apiRef, localRows]);

  /**
   * Create custom header with filter + sort UI
   */
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

  /**
   * Open processing status dialog
   */
  const handleOpenProcessingStatusDialog = useCallback(
    (propertyCode: string) => {
      setDialogPropertyCode(propertyCode);
      setOpenProcessingStatusDialog(true);
    },
    []
  );

  /**
   * Close processing status dialog
   */
  const handleCloseProcessingStatusDialog = useCallback(() => {
    setOpenProcessingStatusDialog(false);
  }, []);

  /**
   * Update selected rows (checkbox / selection state)
   */
  const handleRowSelectionModelChange = useCallback(
    (newSelection: GridRowSelectionModel) => {
      setRowSelectionModel(newSelection);
    },
    [setRowSelectionModel]
  );

  /**
   * Update pagination state
   */
  const handlePaginationModelChange = useCallback(
    (newModel: GridPaginationModel) => {
      setPaginationModel(newModel);
    },
    [setPaginationModel]
  );

  /**
   * Handle inline cell edit
   * Update localRows only (not server yet)
   */
  const handleProcessRowUpdate = useCallback((updatedRow: PropertyRow) => {
    setLocalRows((prevRows) =>
      prevRows.map((row) => (row.id === updatedRow.id ? updatedRow : row))
    );

    return updatedRow;
  }, []);

  /**
   * Handle row click (select property)
   */
  const handleRowClick = useCallback(
    (params: { id: PropertyRow["id"]; row: PropertyRow }) => {
      setSelectedProperty(params.id, params.row.propertyCode);
    },
    [setSelectedProperty]
  );

  /**
   * Handle row double click:
   * - Select row
   * - Open processing status dialog
   */
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

  /**
   * Column definitions for DataGrid
   */
  const columns = useMemo(
  () =>
      createPropertyColumns({
        renderFilterableHeader,
      }),
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
        onRowClick={handleRowClick}
        onRowDoubleClick={handleRowDoubleClick}
        slots={{
          footer: () => (
            <PropertiesPaginationFooter
              paginationModel={paginationModel}
              setPaginationModel={setPaginationModel}
            />
          ),
        }}
      />

      {/* Processing status dialog */}
      <ProcessingStatusStateDialog
        open={openProcessingStatusDialog}
        onClose={handleCloseProcessingStatusDialog}
        propertyCode={dialogPropertyCode ?? undefined}
      />
    </Box>
  );
}

/**
 * Properties screen (main container)
 */
export default function Properties() {
  const { isLoading, isFetching, refetch } = useProperties();

  const resetGridView = usePropertiesGridStore((state) => state.resetGridView);

  /**
   * Refresh data from server and reset grid state
   */
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

      {/* Global loading indicator */}
      <LoadingDialog open={isLoading || isFetching} />
    </div>
  );
}