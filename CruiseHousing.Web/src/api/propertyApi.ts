import {
  paggingdata,
  PROPERTY_COLUMN_SOURCES,
  MANAGEMENT_TYPE_OPTIONS,
  PROCESSING_STATUS_OPTIONS,
  PROPERTY_STATUS_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  PROCESSING_STATUS_STATE_ROWS,
} from "@/features/properties/data.dump";
import { apiClient } from "./client";
import { ProcessingStatusStateRow, PROPERTY_MASTER_TYPES, PropertyColumnConfig, PropertyColumnSource } from "@/features/properties/types";

export type PropertyMasterData = {
  managementTypeOptions: typeof MANAGEMENT_TYPE_OPTIONS;
  propertyTypeOptions: typeof PROPERTY_TYPE_OPTIONS;
  propertyStatusOptions: typeof PROPERTY_STATUS_OPTIONS;
  processingStatusOptions: typeof PROCESSING_STATUS_OPTIONS;
};

export const fetchProperties = async () => {
    /** 
  await sleep(500);
  return paggingdata;
 */

  const res = await apiClient.get("/properties");
  return res.data;
};

export const fetchPropertyMasterData = async (): Promise<PropertyMasterData> => {

  /** 
  await sleep(300);
  return {
    managementTypeOptions: MANAGEMENT_TYPE_OPTIONS,
    propertyTypeOptions: PROPERTY_TYPE_OPTIONS,
    propertyStatusOptions: PROPERTY_STATUS_OPTIONS,
    processingStatusOptions: PROCESSING_STATUS_OPTIONS,
  };
 */

  const res = await apiClient.get("/master-data", {
    params: {
      types: PROPERTY_MASTER_TYPES.join(","),
    },
  });

  const data = res.data;
  return {
    managementTypeOptions: data.managementType ?? [],
    propertyTypeOptions: data.propertyType ?? [],
    propertyStatusOptions: data.propertyStatus ?? [],
    processingStatusOptions: data.processingStatus ?? [],
  };
};

export const fetchPropertyColumnSources = async (): Promise<PropertyColumnSource[]> => {
  await sleep(300);
  return PROPERTY_COLUMN_SOURCES;

  const res = await apiClient.get("/properties/column-sources");
  return res.data;
};

export const fetchPropertyColumnConfigs = async (): Promise<PropertyColumnConfig[]> => {
  await sleep(300);
  return PROPERTY_COLUMN_SOURCES.filter(
    ({ field }) => !["managementStartDate", "managementEndDate"].includes(field)
  ).map(({ field, headerName, visible }) => ({
    field,
    headerName,
    dataSource: field,
    visible,
  }));

  const res = await apiClient.get("/properties/column-configs");
  return res.data;
};

export const savePropertyColumnConfigs = async (
  columnConfigs: PropertyColumnConfig[]
): Promise<PropertyColumnConfig[]> => {
  await sleep(800);
  throw new Error("この機能は開発中です。");

  const res = await apiClient.put("/properties/column-configs", {
    columnConfigs,
  });
  return res.data;
};

export const fetchProcessingStatusStateRows = async (
  propertyCode?: string
): Promise<ProcessingStatusStateRow[]> => {
  await sleep(300);
  return PROCESSING_STATUS_STATE_ROWS;

  const res = await apiClient.get("/properties/processing-status-state", {
    params: { propertyCode },
  });
  return res.data;
};

const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));