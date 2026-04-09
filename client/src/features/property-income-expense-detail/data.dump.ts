import { addDays, format } from "date-fns";
import {
  type PropertyHeaderProps,
  type PropertyIncomeExpenseDetailRow,
  type PropertyTabData,
  type PropertyTabSummary,
} from "./types";

const today = new Date();

const PROPERTY_TYPES = ["一戸建て", "アパート", "マンション"] as const;
const MANAGEMENT_TYPES = ["一般管理", "サブリース", "自主管理"] as const;

const pad2 = (value: number) => value.toString().padStart(2, "0");

const createPropertyCode = (seed: number) => seed % 3 === 0 ? `C-${pad2(seed + 1)}` : seed % 3 === 1 ? `H-${pad2(seed + 1)}` : `T-${pad2(seed + 1)}`;

const createBaseRows = (seed: number): PropertyIncomeExpenseDetailRow[] => {
  let running = 0;

  return Array.from({ length: 200 }, (_, i) => {
    const income = i % 2 === 0 ? 40000 + i * 1000 + seed * 500 : 0;
    const expense = i % 2 !== 0 ? 50000 + i * 500 + seed * 250 : 0;

    running += income - expense;
    const balance = running;  

    let managementCompanyAmount = 120000 + i * 1000 + seed * 1000;

    const date = addDays(today, (i - 200) * 5);


    return {
      id: `${seed + 1}-${i + 1}`,
      yearMonth: "",
      expectedAmount : 0,
      managementCompanyAmount:0,
      transactionDate: format(date, "yyyy/MM/dd"),
      counterparty: `取引先${pad2((i % 9) + 1)}`,
      description:
        i % 2 === 0
          ? `賃料入金データ（物件${pad2(seed + 1)}）`
          : `修繕・管理費データ（物件${pad2(seed + 1)}）`,
      income,
      expense,
      balance,
      note: i % 3 === 0 ? "特記事項あり" : "",
    };
  });
};

const createPropertyHeader = (seed: number): PropertyHeaderProps => {
  const propertyCode = createPropertyCode(seed);

  return {
    propertyCode,
    roomCode: `${100 + ((seed % 5) + 1)}`,
    managementType: MANAGEMENT_TYPES[seed % MANAGEMENT_TYPES.length],
    propertyType: PROPERTY_TYPES[seed % PROPERTY_TYPES.length],
    managementCompany: `管理会社${pad2((seed % 6) + 1)}`,
    managementPeriod: `2026-01-01 ～ 2026-12-31`,
  };
};

export const createPropertyTabSummaries = (count = 90): PropertyTabSummary[] =>
  Array.from({ length: count }, (_, index) => ({
    id: `property-tab-${index + 1}`,
    label: `物件${pad2(index + 1)}`,
    header: createPropertyHeader(index),
  }));

/**
 * Tab list only
 */
export const initialPropertyTabs = createPropertyTabSummaries();

/**
 * Get one tab summary by propertyCode
 */
export const getPropertyTabByCode = (
  propertyCode: string
): PropertyTabSummary | undefined => {
  return initialPropertyTabs.find(
    (tab) => tab.header.propertyCode === propertyCode
  );
};

/**
 * Get list of tab summaries by propertyCode
 */
export const getPropertyTabsByCode = (
  propertyCode: string
): PropertyTabSummary[] => {
  return initialPropertyTabs.filter(
    (tab) => tab.header.propertyCode.includes(propertyCode.charAt(0)) // crude filter for demo
  );
};

/**
 * Get row list by propertyCode
 */
export const getPropertyRowsByCode = (
  propertyCode: string
): PropertyIncomeExpenseDetailRow[] => {
  const index = initialPropertyTabs.findIndex(
    (tab) => tab.header.propertyCode === propertyCode
  );

  if (index < 0) {
    return [];
  }

  return createBaseRows(index);
};

/**
 * Get full detail by propertyCode
 */
export const getPropertyTabDetailByCode = (
  propertyCode: string
): PropertyTabData | undefined => {
  const tab = getPropertyTabByCode(propertyCode);

  if (!tab) {
    return undefined;
  }

  return {
    ...tab,
    rows: getPropertyRowsByCode(propertyCode),
  };
};