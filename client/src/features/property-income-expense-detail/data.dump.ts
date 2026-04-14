import { addDays, format } from "date-fns";
import {
  PropertyIncomeExpenseSummaryRow,
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
      executedState: false, // For context menu toggle demo
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
 * Get list of tab summaries by propertyGroup
 */
export const getPropertyTabsByPropertyGroup = (
  group: string
): PropertyTabSummary[] => {
  return initialPropertyTabs.filter(
    (tab) => tab.header.propertyCode.includes(group)
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

export const getPropertyGroupsFromDumpData = () => {
  return ["C", "H", "T"];
};

export const getDefaultPropertyCodeByGroupFromDumpData = (group: string): string => {
  switch (group) {
    case "C":
      return "C-01";
    case "H":
      return "H-02";
    case "T":
      return "T-03";
    default:
      return "";
  }
};


/**
 * Generate summary rows (stub)
 * - diff có đủ: =0, >0, <0
 * - yearMonth format: yyyy年MM月
 */
export const getPropertyIncomeExpenseSummaryRows = (
  year: number
): PropertyIncomeExpenseSummaryRow[] => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const rows = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;

    const hasData =
      year < currentYear ? true : year === currentYear ? month <= currentMonth : false;

    if (!hasData) {
      return {
        id: `${year}-${pad2(month)}`,
        yearMonth: `${year}年${pad2(month)}月`,
        expectedAmount1: null,
        managementCompanyAmount1: null,
        difference1: null,
        expectedAmount2: null,
        managementCompanyAmount2: null,
        difference2: null,
        expectedAmount3: null,
        managementCompanyAmount3: null,
        difference3: null,
      };
    }

    const base = 100000 + i * 5000;
    const pattern = i % 3;

    const calc = (expected: number) => {
      if (pattern === 0) {
        const actual = expected;
        return { expected, actual, diff: 0 };
      }
      if (pattern === 1) {
        const actual = expected - 10000;
        return { expected, actual, diff: expected - actual };
      }
      const actual = expected + 10000;
      return { expected, actual, diff: expected - actual };
    };

    const g2 = calc(base + 20000);
    const g3 = calc(base + 40000);

    const g1 = {
      expected: g2.expected + g3.expected,
      actual: g2.actual + g3.actual,
      diff: g2.diff + g3.diff,
    };

    return {
      id: `${year}-${pad2(month)}`,
      yearMonth: `${year}年${pad2(month)}月`,

      expectedAmount1: g1.expected,
      managementCompanyAmount1: g1.actual,
      difference1: g1.diff,

      expectedAmount2: g2.expected,
      managementCompanyAmount2: g2.actual,
      difference2: g2.diff,

      expectedAmount3: g3.expected,
      managementCompanyAmount3: g3.actual,
      difference3: g3.diff,
    };
  });

  const totalExpected2 = rows.reduce((sum, r) => sum + (r.expectedAmount2 ?? 0), 0);
  const totalActual2 = rows.reduce(
    (sum, r) => sum + (r.managementCompanyAmount2 ?? 0),
    0
  );

  const totalExpected3 = rows.reduce((sum, r) => sum + (r.expectedAmount3 ?? 0), 0);
  const totalActual3 = rows.reduce(
    (sum, r) => sum + (r.managementCompanyAmount3 ?? 0),
    0
  );

  const totalRow: PropertyIncomeExpenseSummaryRow = {
    id: `${year}-total`,
    yearMonth: `${year}年合計`,

    expectedAmount1: totalExpected2 + totalExpected3,
    managementCompanyAmount1: totalActual2 + totalActual3,
    difference1: (totalExpected2 + totalExpected3) - (totalActual2 + totalActual3),

    expectedAmount2: totalExpected2,
    managementCompanyAmount2: totalActual2,
    difference2: totalExpected2 - totalActual2,

    expectedAmount3: totalExpected3,
    managementCompanyAmount3: totalActual3,
    difference3: totalExpected3 - totalActual3,
  };

  return [...rows, totalRow];
};


export const getYears = () => [2026, 2025, 2024];
export const getTabs = () => [
    "物件グループ：A",
    "物件グループ：B",
    "物件グループ：C",
    "物件グループ：D",
    "物件グループ：E",
    "物件グループ：F",
    "物件グループ：G",
    "物件グループ：H",
    "物件グループ：I",
    "物件グループ：J",
  ];

export const getManagementCompanies = () => [
    "001  XXXXXXXXXXXXXXXXXXXX", 
    "002  XXXXXXXXXXXXXXXXXXXX",
    "003  XXXXXXXXXXXXXXXXXXXX"
];