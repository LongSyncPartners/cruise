import { apiClient } from "./client";
import {
  initialPropertyTabs,
  getPropertyTabByCode,
  getPropertyRowsByCode,
  getPropertyTabDetailByCode,
  getPropertyTabsByCode,
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
  const res = await apiClient.get("/property-income-expense-detail/tabs");
  return res.data;
};

/**
 * Fetch tab list by propertyCode
 */
export const fetchPropertyIncomeExpenseTabsByPropertyCode = async (
  propertyCode: string
) => {
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
  const res = await apiClient.get("/property-income-expense-detail/rows", {
    params: { propertyCode },
  });
  return res.data;
};

/**
 * Fetch full detail (tab summary + rows) by propertyCode
 */
export const fetchPropertyIncomeExpenseDetail = async (propertyCode: string) => {
  const res = await apiClient.get("/property-income-expense-detail/detail", {
    params: { propertyCode },
  });
  return res.data;
};

/**
 * =========================
 * Stub API
 * =========================
 */

/**
 * Fetch tab list only from stub
 */
export async function fetchPropertyIncomeExpenseTabsFromStubApi() {
  await sleep(500);
  return initialPropertyTabs;
}

/**
 * Fetch tab list by propertyCode from stub
 */
export async function fetchPropertyIncomeExpenseTabsByPropertyCodeFromStubApi(
  propertyCode: string
) {
  await sleep(500);
  return getPropertyTabsByCode(propertyCode);
}

/**
 * Fetch one tab summary by propertyCode from stub
 */
export async function fetchPropertyIncomeExpenseTabFromStubApi(
  propertyCode: string
) {
  await sleep(500);

  const tab = getPropertyTabByCode(propertyCode);

  if (!tab) {
    throw new Error(`Property tab not found: ${propertyCode}`);
  }

  return tab;
}

/**
 * Fetch row list by propertyCode from stub
 */
export async function fetchPropertyIncomeExpenseRowsFromStubApi(
  propertyCode: string
) {
  await sleep(500);

  const rows = getPropertyRowsByCode(propertyCode);

  if (!rows.length) {
    throw new Error(`Property rows not found: ${propertyCode}`);
  }

  return rows;
}

/**
 * Fetch full detail (tab summary + rows) by propertyCode from stub
 */
export async function fetchPropertyIncomeExpenseDetailFromStubApi(
  propertyCode: string
) {
  await sleep(500);

  const detail = getPropertyTabDetailByCode(propertyCode);

  if (!detail) {
    throw new Error(`Property income/expense detail not found: ${propertyCode}`);
  }

  return detail;
}