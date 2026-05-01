import { useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import {
  DataGrid,
  useGridApiRef,
  type GridColDef,
  type GridPaginationModel,
  type GridRowSelectionModel,
} from "@mui/x-data-grid";

import type { PropertyDataGridProps, PropertyRow } from "./types";
import ProcessingStatusStateDialog from "./ProcessingStatusDialog";
import { useProcessingStatusStateRows } from "@/hooks/useProcessingStatusStateRows";
import { dataGridCommonSx } from "../shared/dataGridCommonSx";
import PropertiesPaginationFooter from "./PropertiesPaginationFooter";
import CustomContextMenuHeader, {
  type HeaderContextMenuState,
} from "../shared/CustomContextMenuHeader";

import { usePropertySelectionStore } from "../../stores/propertySelectionStore";
import { usePropertiesGridStore } from "@/stores/propertiesGridStore";
import { useProperties } from "@/hooks/useProperties";

export default function PropertyDataGrid({
  height = 700,
  columns,
  dataSourceOptions,
  onRenameHeader,
  onDeleteHeader,
  onAddHeader,
  onSave,
}: PropertyDataGridProps) {
  const [openProcessingStatusDialog, setOpenProcessingStatusDialog] =
    useState(false);
  const [dialogPropertyCode, setDialogPropertyCode] = useState<string | null>(
    null
  );
  const [headerContextMenu, setHeaderContextMenu] =
    useState<HeaderContextMenuState>(null);

  const [localRows, setLocalRows] = useState<PropertyRow[]>([]);

  const apiRef = useGridApiRef();
  const { data, isLoading, isError, error, refetch  } = useProperties();

  const setSelectedProperty = usePropertySelectionStore(
    (state) => state.setSelectedProperty
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
    setLocalRows(data ?? []);
  }, [data]);

    /**
  useEffect(() => {
    const timer = window.setTimeout(() => {
      apiRef.current?.resetRowHeights();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [apiRef, localRows, columns]);
 */
  const handleOpenProcessingStatusDialog = useCallback(
    (propertyCode: string) => {
      setDialogPropertyCode(propertyCode);
      setOpenProcessingStatusDialog(true);
    },
    []
  );

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
    setLocalRows((prev) =>
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
      setRowSelectionModel({
        type: "include",
        ids: new Set([params.id]),
      });

      setSelectedProperty(params.id, params.row.propertyCode);
      handleOpenProcessingStatusDialog(params.row.propertyCode);
    },
    [handleOpenProcessingStatusDialog, setRowSelectionModel, setSelectedProperty]
  );

  const handleHeaderContextMenu = useCallback(
    (
      params: { field: string; colDef: { headerName?: string } },
      event: React.MouseEvent
    ) => {
      event.preventDefault();

      setHeaderContextMenu({
        mouseX: event.clientX - 2,
        mouseY: event.clientY - 4,
        field: params.field,
        headerName: params.colDef.headerName ?? "",
      });
    },
    []
  );

  const handleCloseHeaderContextMenu = useCallback(() => {
    setHeaderContextMenu(null);
  }, []);

  const {
    data: processingStatusRows = [],
  } = useProcessingStatusStateRows();


  return (
    <Box sx={{ width: "auto", height: "calc(100vh - 160px)" }}>
      <DataGrid
        rows={localRows}
        columns={columns}
        rowHeight={30}
        columnHeaderHeight={30}
        pageSizeOptions={[30]}
        editMode="cell"
        disableColumnMenu
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
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
        onRowClick={handleRowClick}
        onRowDoubleClick={handleRowDoubleClick}
         localeText={{
          noRowsLabel: "データがありません",
          noResultsOverlayLabel: "データがありません",
        }}
        slots={{
          footer: () => (
            <PropertiesPaginationFooter
              paginationModel={paginationModel}
              setPaginationModel={setPaginationModel}
            />
          ),
        }}
      />

      <CustomContextMenuHeader
        contextMenu={headerContextMenu}
        headerOptions={dataSourceOptions}
        onClose={handleCloseHeaderContextMenu}
        onRenameHeader={onRenameHeader}
        onDeleteHeader={onDeleteHeader}
        onAddHeader={onAddHeader}
        onSave={onSave}
      />

      <ProcessingStatusStateDialog
        open={openProcessingStatusDialog}
        onClose={() => setOpenProcessingStatusDialog(false)}
        propertyCode={dialogPropertyCode ?? undefined}
        rows={processingStatusRows}
      />
    </Box>
  );
}
