import { apiClient } from "./client";
import type { PropertyIncomeExpenseDetailRow } from "@/features/property-income-expense-detail/types";
import {
  initialPropertyTabs,
  getPropertyTabByCode,
  getPropertyRowsByCode,
  getPropertyTabDetailByCode,
  getPropertyTabsByCode,
  getPropertyTabsByPropertyGroup,
  getDefaultPropertyCodeByGroupFromDumpData,
  getPropertyGroupsFromDumpData,
} from "@/features/property-income-expense-detail/data.dump";

const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * =========================
 * Real API
 * =========================
 */

/**
 * Fetch tab list only
 */
export const fetchPropertyIncomeExpenseTabs = async () => {

  // stub dataでエラーを投げているため、実装完了後はこの行を削除してください。
  await sleep(500);
  return initialPropertyTabs;

  const res = await apiClient.get("/property-income-expense-detail/tabs");
  return res.data;
};

/**
 * Fetch tab list by propertyCode
 */
export const fetchPropertyIncomeExpenseTabsByPropertyCode = async (
  propertyCode: string
) => {
  // stub dataでエラーを投げているため、実装完了後はこの行を削除してください。
  await sleep(500);
  return getPropertyTabsByCode(propertyCode);

  const res = await apiClient.get("/property-income-expense-detail/tabs", {
    params: { propertyCode },
  });
  return res.data;
};

/**
 * Fetch one tab summary by propertyCode
 */
export const fetchPropertyIncomeExpenseTab = async (propertyCode: string) => {
  const res = await apiClient.get("/property-income-expense-detail/tab", {
    params: { propertyCode },
  });
  return res.data;
};

/**
 * Fetch row list by propertyCode
 */
export const fetchPropertyIncomeExpenseRows = async (propertyCode: string) => {

  // stub dataでエラーを投げているため、実装完了後はこの行を削除してください。
  await sleep(500);
  const rows = getPropertyRowsByCode(propertyCode);
  return rows;

  const res = await apiClient.get("/property-income-expense-detail/rows", {
    params: { propertyCode },
  });
  return res.data;
};

/**
 * Fetch full detail (tab summary + rows) by propertyCode
 */
export const fetchPropertyIncomeExpenseDetail = async (propertyCode: string) => {

  // stub dataでエラーを投げているため、実装完了後はこの行を削除してください。
  await sleep(500);
  const detail = getPropertyTabDetailByCode(propertyCode);
  return detail;

  const res = await apiClient.get("/property-income-expense-detail/detail", {
    params: { propertyCode },
  });
  return res.data;
};

/**
 * Save edited rows by propertyCode
 */
export const savePropertyIncomeExpenseRows = async (
  propertyCode: string,
  rows: PropertyIncomeExpenseDetailRow[]
) => {
  await sleep(800);
  throw new Error("この機能は開発中です。"); // stub dataでエラーを投げているため、実装完了後はこの行を削除してください。

  const res = await apiClient.post("/property-income-expense-detail/rows", {
    propertyCode,
    rows,
  });
  return res.data;
};

/**
 * =========================
 * Get list of property groups
 * =========================
 */
export async function getPropertyGroups() {
  await sleep(300);
  return getPropertyGroupsFromDumpData();
}

/**
 * =========================
 * Get default property code by group
 * =========================
 */
export async function getDefaultPropertyCodeByGroup(group: string) {
  await sleep(300);
  return getDefaultPropertyCodeByGroupFromDumpData(group);
}

