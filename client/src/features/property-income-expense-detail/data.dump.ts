import { addDays, format } from "date-fns";
import {
  PropertyIncomeExpenseSummaryItem,
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

  const length = 200 + Math.floor(Math.random() * 200) + 1; // 1 → 200

  return Array.from({ length: length }, (_, i) => {
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
        expectedAmountSummary: null,
        managementCompanyAmountSummary: null,
        differenceSummary: null,
        expectedAmount1: null,
        managementCompanyAmount1: null,
        difference1: null,
        expectedAmount2: null,
        managementCompanyAmount2: null,
        difference2: null,
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

      expectedAmountSummary: g1.expected,
      managementCompanyAmountSummary: g1.actual,
      differenceSummary: g1.diff,

      expectedAmount1: g2.expected,
      managementCompanyAmount1: g2.actual,
      difference1: g2.diff,

      expectedAmount2: g3.expected,
      managementCompanyAmount2: g3.actual,
      difference2: g3.diff,
    };
  });

  const totalExpected1 = rows.reduce((sum, r) => sum + (r.expectedAmount1 ?? 0), 0);
  const totalActual1 = rows.reduce(
    (sum, r) => sum + (r.managementCompanyAmount1 ?? 0),
    0
  );

  const totalExpected2 = rows.reduce((sum, r) => sum + (r.expectedAmount2 ?? 0), 0);
  const totalActual2 = rows.reduce(
    (sum, r) => sum + (r.managementCompanyAmount2 ?? 0),
    0
  );

  const totalRow: PropertyIncomeExpenseSummaryRow = {
    id: `${year}-total`,
    yearMonth: `${year}年合計`,

    expectedAmountSummary: totalExpected1 + totalExpected2,
    managementCompanyAmountSummary: totalActual1 + totalActual2,
    differenceSummary: (totalExpected1 + totalExpected2) - (totalActual1 + totalActual2),

    expectedAmount1: totalExpected1,
    managementCompanyAmount1: totalActual1,
    difference1: totalExpected1 - totalActual1,

    expectedAmount2: totalExpected2,
    managementCompanyAmount2: totalActual2,
    difference2: totalExpected2 - totalActual2,
  };

  return [...rows, totalRow];
};

export const getYears = () => [2026, 2025, 2024];
export const getTabs = () => [
    "A",
    "B",
    "C",
  ];

export const getManagementCompanies = () => [
    "001  XXXXXXXXXXXXXXXXXXXX", 
    "002  XXXXXXXXXXXXXXXXXXXX",
    "003  XXXXXXXXXXXXXXXXXXXX"
];


export const getPropertyIncomeExpenseSummaryItems = (
  year: number
): PropertyIncomeExpenseSummaryItem[] => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const propertyGroups = ["A", "B", "C"]; // 👉 có thể đổi theo data thật

  const items: PropertyIncomeExpenseSummaryItem[] = [];

  for (let i = 0; i < 12; i++) {
    const month = i + 1;

    const hasData =
      year < currentYear
        ? true
        : year === currentYear
        ? month <= currentMonth
        : false;

    for (const group of propertyGroups) {
      if (!hasData) {
        items.push({
          yearMonth: `${year}${pad2(month)}`,
          propertyGroup: group,
          expectedAmount: null,
          managementCompanyAmount: null,
          difference: null,
        });
        continue;
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

      let value;

      // 👉 mỗi group có scale khác nhau
      switch (group) {
        case "A":
          value = calc(base);
          break;
        case "B":
          value = calc(base + 20000);
          break;
        case "C":
          value = calc(base + 40000);
          break;
        default:
          value = calc(base);
      }

      items.push({
        yearMonth: `${year}${pad2(month)}`,
        propertyGroup: group,
        expectedAmount: value.expected,
        managementCompanyAmount: value.actual,
        difference: value.diff,
      });
    }
  }

  return items;
};