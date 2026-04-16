import { PropertyIncomeExpenseSummaryItem, PropertyIncomeExpenseSummaryRow } from "./types";
import { formatYearMonth } from "./utils";

export function getYears() {
  const currentYear = new Date().getFullYear();

  return [
    currentYear,
    currentYear - 1,
    currentYear - 2,
  ];
}

/**
 * Build grid rows from raw summary items for 2 visible property groups.
 */
export function buildSummaryRows(
  items: PropertyIncomeExpenseSummaryItem[],
  propertyGroup1?: string,
  propertyGroup2?: string
): PropertyIncomeExpenseSummaryRow[] {
  const yearMonthMap = new Map<string, PropertyIncomeExpenseSummaryRow>();

  const extractYear = (ym: string) => ym.slice(0, 4);

  const ensureRow = (yearMonth: string): PropertyIncomeExpenseSummaryRow => {
    const existing = yearMonthMap.get(yearMonth);
    if (existing) return existing;

    const row: PropertyIncomeExpenseSummaryRow = {
      id: yearMonth,
      yearMonth, //  raw

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

    yearMonthMap.set(yearMonth, row);
    return row;
  };

  for (const item of items) {
    const row = ensureRow(item.yearMonth);

    row.expectedAmountSummary =
      (row.expectedAmountSummary ?? 0) + (item.expectedAmount ?? 0);
    row.managementCompanyAmountSummary =
      (row.managementCompanyAmountSummary ?? 0) +
      (item.managementCompanyAmount ?? 0);
    row.differenceSummary =
      (row.differenceSummary ?? 0) + (item.difference ?? 0);

    if (propertyGroup1 && item.propertyGroup === propertyGroup1) {
      row.expectedAmount1 = item.expectedAmount;
      row.managementCompanyAmount1 = item.managementCompanyAmount;
      row.difference1 = item.difference;
    }

    if (propertyGroup2 && item.propertyGroup === propertyGroup2) {
      row.expectedAmount2 = item.expectedAmount;
      row.managementCompanyAmount2 = item.managementCompanyAmount;
      row.difference2 = item.difference;
    }
  }

  const rawRows = [...yearMonthMap.values()].sort((a, b) =>
    a.yearMonth.localeCompare(b.yearMonth)
  );

  // format 
  const rows = rawRows.map((r) => {
    const expected = r.expectedAmountSummary ?? 0;
    const actual = r.managementCompanyAmountSummary ?? 0;

    const isZero = expected === 0 && actual === 0;

    return {
      ...r,
      yearMonth: formatYearMonth(r.yearMonth),

      expectedAmountSummary: isZero ? null : r.expectedAmountSummary,
      managementCompanyAmountSummary: isZero
        ? null
        : r.managementCompanyAmountSummary,
      differenceSummary: isZero ? null : r.differenceSummary,
    };
  });

  // get year
  const year = rawRows.length > 0 ? extractYear(rawRows[0].id as string) : "";

  const totalRow: PropertyIncomeExpenseSummaryRow = {
    id: `${year}-total`,
    yearMonth: `${year}年計`, // 

    expectedAmountSummary: rows.reduce(
      (sum, r) => sum + (r.expectedAmountSummary ?? 0),
      0
    ),
    managementCompanyAmountSummary: rows.reduce(
      (sum, r) => sum + (r.managementCompanyAmountSummary ?? 0),
      0
    ),
    differenceSummary: rows.reduce(
      (sum, r) => sum + (r.differenceSummary ?? 0),
      0
    ),

    expectedAmount1: rows.reduce(
      (sum, r) => sum + (r.expectedAmount1 ?? 0),
      0
    ),
    managementCompanyAmount1: rows.reduce(
      (sum, r) => sum + (r.managementCompanyAmount1 ?? 0),
      0
    ),
    difference1: rows.reduce(
      (sum, r) => sum + (r.difference1 ?? 0),
      0
    ),

    expectedAmount2: rows.reduce(
      (sum, r) => sum + (r.expectedAmount2 ?? 0),
      0
    ),
    managementCompanyAmount2: rows.reduce(
      (sum, r) => sum + (r.managementCompanyAmount2 ?? 0),
      0
    ),
    difference2: rows.reduce(
      (sum, r) => sum + (r.difference2 ?? 0),
      0
    ),
  };

  return [...rows, totalRow];
}

/**
 * Get available property groups from raw summary items.
 */
export function extractPropertyGroups(items: PropertyIncomeExpenseSummaryItem[]): string[] {
  return [...new Set(items.map((item) => item.propertyGroup))];
}

/**
 * Get visible group pair from active tab index.
 * Example:
 * index 0 => [tabs[0], tabs[1]]
 * index 1 => [tabs[1], tabs[2]]
 */
export function getVisibleGroups(tabs: string[], activeTabIndex: number) {
  return {
    propertyGroup1: tabs[activeTabIndex],
    propertyGroup2: tabs[activeTabIndex + 1],
  };
}