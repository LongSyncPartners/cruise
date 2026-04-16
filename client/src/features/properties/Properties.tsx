import { useCallback, useMemo, useState } from "react";
import { Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

import PropertyDataGrid from "./PropertyDataGrid";
import LoadingDialog from "../shared/LoadingDialog";

import { useProperties } from "@/hooks/useProperties";
import { usePropertiesGridStore } from "@/stores/propertiesGridStore";
import { createFilterableHeader } from "../shared/createFilterableHeader";
import {
  createPropertyColumns,
  DEFAULT_PROPERTY_COLUMN_CONFIGS,
  type PropertyColumnConfig,
} from "./propertyColumns";
import {
  PROPERTY_COLUMN_SOURCE_OPTIONS,
  PROPERTY_COLUMN_SOURCES,
} from "./data.dump";

import "./index.style.css";

export default function Properties() {
  const { isLoading, isFetching, refetch } = useProperties();

  const resetGridView = usePropertiesGridStore((state) => state.resetGridView);

  const filterModel = usePropertiesGridStore((state) => state.filterModel);
  const sortModel = usePropertiesGridStore((state) => state.sortModel);
  const setFilterModel = usePropertiesGridStore((state) => state.setFilterModel);
  const setSortModel = usePropertiesGridStore((state) => state.setSortModel);

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

  const [columnConfigs, setColumnConfigs] = useState<PropertyColumnConfig[]>(
    DEFAULT_PROPERTY_COLUMN_CONFIGS
  );

  const columns = useMemo(
    () =>
      createPropertyColumns({
        renderFilterableHeader,
        columnConfigs,
      }),
    [columnConfigs, renderFilterableHeader]
  );

  const handleRefresh = useCallback(async () => {
    await refetch();
    resetGridView();
  }, [refetch, resetGridView]);

  const handleRenameHeader = useCallback((field: string, headerName: string) => {
    setColumnConfigs((prev) =>
      prev.map((column) =>
        column.field === field
          ? {
              ...column,
              headerName,
            }
          : column
      )
    );
  }, []);

  const handleDeleteHeader = useCallback((field: string) => {
    setColumnConfigs((prev) => prev.filter((column) => column.field !== field));
  }, []);

  const handleAddHeader = useCallback(
    (afterField: string, headerName: string, dataSource?: string) => {
      const normalizedHeaderName = headerName.trim();
      const selectedSource = dataSource?.trim();
      const sourceDefinition = PROPERTY_COLUMN_SOURCES.find(
        ({ field }) => field === selectedSource
      );

      const newColumn: PropertyColumnConfig = {
        field: `custom_${Date.now()}`,
        headerName: normalizedHeaderName || sourceDefinition?.headerName || "新しい項目",
        dataSource: selectedSource || undefined,
      };

      setColumnConfigs((prev) => {
        const insertIndex = prev.findIndex((column) => column.field === afterField);

        if (insertIndex < 0) {
          return [...prev, newColumn];
        }

        return [
          ...prev.slice(0, insertIndex + 1),
          newColumn,
          ...prev.slice(insertIndex + 1),
        ];
      });
    },
    []
  );

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
        <PropertyDataGrid
          columns={columns}
          dataSourceOptions={PROPERTY_COLUMN_SOURCE_OPTIONS}
          onRenameHeader={handleRenameHeader}
          onDeleteHeader={handleDeleteHeader}
          onAddHeader={handleAddHeader}
        />
      </div>

      <LoadingDialog open={isLoading || isFetching} />
    </div>
  );
}
