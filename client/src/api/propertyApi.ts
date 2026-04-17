import { paggingdata, PROPERTY_COLUMN_SOURCES } from "@/features/properties/data.dump";
import { apiClient } from "./client";
import type {
  PropertyColumnConfig,
  PropertyColumnSource,
} from "@/features/properties/propertyColumns";

export const fetchProperties = async () => {
  // stub dataでエラーを投げているため、実装完了後はこの行を削除してください。
  await sleep(500);
  return paggingdata;

  const res = await apiClient.get("/properties");
  return res.data;
};

export const fetchPropertyColumnSources = async (): Promise<PropertyColumnSource[]> => {
  // stub dataでエラーを投げているため、実装完了後はこの行を削除してください。
  await sleep(300);
  return PROPERTY_COLUMN_SOURCES;

  const res = await apiClient.get("/properties/column-sources");
  return res.data;
};

export const fetchPropertyColumnConfigs = async (): Promise<PropertyColumnConfig[]> => {
  // stub dataでエラーを投げているため、実装完了後はこの行を削除してください。
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
  // stub dataでエラーを投げているため、実装完了後はこの行を削除してください。
  await sleep(800);
  throw new Error("この機能は開発中です。");

  const res = await apiClient.put("/properties/column-configs", {
    columnConfigs,
  });
  return res.data;
};

const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));