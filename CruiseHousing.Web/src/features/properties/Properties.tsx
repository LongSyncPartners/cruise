import { useCallback, useEffect, useMemo, useState } from "react";
import { Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

import PropertyDataGrid from "./PropertyDataGrid";
import LoadingDialog from "../shared/LoadingDialog";

import { useProperties } from "@/hooks/useProperties";
import { usePropertiesGridStore } from "@/stores/propertiesGridStore";
import { createFilterableHeader } from "../shared/createFilterableHeader";
import {
  createPropertyColumns,
} from "./propertyColumns";

import "./index.style.css";
import { useAppToast } from "@/providers/ToastProvider";
import {
  usePropertyColumnConfigs,
  useSavePropertyColumnConfigs,
} from "@/hooks/usePropertyColumnConfigs";
import { usePropertyColumnSources } from "@/hooks/usePropertyColumnSources";
import { usePropertyMasterData } from "@/hooks/usePropertyMasterData";
import { PropertyColumnConfig } from "./types";
import { getUserFriendlyMessage } from "@/api/errorHandler";

/**
 * =========================
 * Utils
 * =========================
 */
function buildDefaultPropertyColumnConfigs(
  columnSources: Array<{
    field: string;
    headerName: string;
    visible?: boolean;
  }>
): PropertyColumnConfig[] {
  return columnSources
    .filter(({ field }) => !["managementStartDate", "managementEndDate"].includes(field))
    .map(({ field, headerName, visible }) => ({
      field,
      headerName,
      dataSource: field,
      visible,
    }));
}

/**
 * =========================
 * Component
 * =========================
 */
export default function Properties() {

  const {
    data: masterData,
    isLoading: isMasterDataLoading,
    isFetching: isMasterDataFetching,
    isError: isMasterDataError,
    error
  } = usePropertyMasterData();

  const {
    data: loadedColumnSources = [],
    isLoading: isColumnSourcesLoading,
    isFetching: isColumnSourcesFetching,
  } = usePropertyColumnSources();

  const {
    data: loadedColumnConfigs,
    isLoading: isColumnConfigsLoading,
    isFetching: isColumnConfigsFetching,
  } = usePropertyColumnConfigs();

  const { mutateAsync: saveColumnConfigs, isPending: isSavingColumnConfigs } =
    useSavePropertyColumnConfigs();

  /**
   * =========================
   * Store (Zustand)
   * =========================
   */
  const resetGridView = usePropertiesGridStore((state) => state.resetGridView);

  const filterModel = usePropertiesGridStore((state) => state.filterModel);
  const sortModel = usePropertiesGridStore((state) => state.sortModel);
  const setFilterModel = usePropertiesGridStore((state) => state.setFilterModel);
  const setSortModel = usePropertiesGridStore((state) => state.setSortModel);

  /**
   * =========================
   * Local state
   * =========================
   */
  const [columnConfigs, setColumnConfigs] = useState<PropertyColumnConfig[]>([]);

  /**
   * =========================
   * Derived (useMemo)
   * =========================
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

  const defaultColumnConfigs = useMemo(
    () => buildDefaultPropertyColumnConfigs(loadedColumnSources),
    [loadedColumnSources]
  );

  const dataSourceOptions = useMemo(
    () =>
      loadedColumnSources
        .filter(({ visible }) => visible === false)
        .map(({ field, headerName, visible }) => ({
          value: field,
          label: headerName,
          visible,
        })),
    [loadedColumnSources]
  );

  const columns = useMemo(
    () =>
      createPropertyColumns({
        renderFilterableHeader,
        columnConfigs,
        managementTypeOptions: masterData?.managementTypeOptions ?? [],
        propertyTypeOptions: masterData?.propertyTypeOptions ?? [],
        propertyStatusOptions: masterData?.propertyStatusOptions ?? [],
        processingStatusOptions: masterData?.processingStatusOptions ?? [],
      }),
    [columnConfigs, renderFilterableHeader, masterData]
  );

  /**
   * =========================
   * Effects
   * =========================
   */
  useEffect(() => {
    if (loadedColumnConfigs && loadedColumnConfigs.length > 0) {
      setColumnConfigs(loadedColumnConfigs);
      return;
    }

    if (loadedColumnSources.length > 0) {
      setColumnConfigs(defaultColumnConfigs);
    }
  }, [loadedColumnConfigs, loadedColumnSources, defaultColumnConfigs]);

    /**
   * =========================
   * Query / External hooks
   * =========================
   */
  const { isLoading, isFetching, refetch } = useProperties();
  /**
   * =========================
   * Handlers (useCallback)
   * =========================
   */
  const handleRefresh = useCallback(async () => {
    await Promise.all([refetch()]);
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

      const sourceDefinition = loadedColumnSources.find(
        ({ field }) => field === selectedSource
      );

      const newColumn: PropertyColumnConfig = {
        field: `custom_${Date.now()}`,
        headerName:
          normalizedHeaderName || sourceDefinition?.headerName || "新しい項目",
        dataSource: selectedSource || undefined,
        visible: true,
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
    [loadedColumnSources]
  );

  /**
   * =========================
   * UI helpers / providers
   * =========================
   */
  const { showToast } = useAppToast();

  const handleSave = useCallback(async () => {
    try {
      await saveColumnConfigs(columnConfigs);
      showToast("保存しました。", "success");
    } catch (error) {
      if (error instanceof Error) {
        showToast("保存に失敗しました。", "error", error.message);
      } else {
        showToast("保存に失敗しました。", "error", `${error}`);
      }
    }
  }, [columnConfigs, saveColumnConfigs, showToast]);

  useEffect(() => {
    if (isMasterDataError) {
      showToast(getUserFriendlyMessage(error), "error");
    }
  }, [isMasterDataError, error]);

  /**
   * =========================
   * Render
   * =========================
   */
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
          dataSourceOptions={dataSourceOptions}
          onRenameHeader={handleRenameHeader}
          onDeleteHeader={handleDeleteHeader}
          onAddHeader={handleAddHeader}
          onSave={handleSave}
        />
      </div>

      <LoadingDialog
        open={
          isLoading ||
          isFetching ||
          isColumnSourcesLoading ||
          isColumnSourcesFetching ||
          isColumnConfigsLoading ||
          isColumnConfigsFetching ||
          isSavingColumnConfigs ||
          isMasterDataLoading ||
          isMasterDataFetching ||
          isColumnSourcesLoading ||
          isColumnSourcesFetching
        }
      />
    </div>
  );
}