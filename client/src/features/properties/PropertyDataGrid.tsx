import { useCallback, useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import {
  DataGrid,
  useGridApiRef,
  type GridPaginationModel,
  type GridRowSelectionModel,
} from "@mui/x-data-grid";

import type { PropertyRow } from "./types";

import { dataGridCommonSx } from "../shared/dataGridCommonSx";
import { createFilterableHeader } from "../shared/createFilterableHeader";
import ProcessingStatusStateDialog from "./ProcessingStatusDialog";
import PropertiesPaginationFooter from "./PropertiesPaginationFooter";

import { usePropertySelectionStore } from "../../stores/propertySelectionStore";
import { usePropertiesGridStore } from "@/stores/propertiesGridStore";
import { useProperties } from "@/hooks/useProperties";
import { createPropertyColumns } from "./propertyColumns";

type Props = {
  height?: number;
};

export default function PropertyDataGrid({ height = 700 }: Props) {
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

  const columns = useMemo(
    () =>
      createPropertyColumns({
        renderFilterableHeader,
      }),
    [renderFilterableHeader]
  );

  return (
    <Box sx={{ width: "auto", height }}>
      <DataGrid
        rows={localRows}
        columns={columns}
        rowHeight={45}
        columnHeaderHeight={40}
        pageSizeOptions={[20]}
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
        slots={{
          footer: () => (
            <PropertiesPaginationFooter
              paginationModel={paginationModel}
              setPaginationModel={setPaginationModel}
            />
          ),
        }}
      />

      <ProcessingStatusStateDialog
        open={openProcessingStatusDialog}
        onClose={() => setOpenProcessingStatusDialog(false)}
        propertyCode={dialogPropertyCode ?? undefined}
      />
    </Box>
  );
}