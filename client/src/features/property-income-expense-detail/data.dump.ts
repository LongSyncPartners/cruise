import { addDays, format } from "date-fns";
import { type PropertyHeaderProps, type PropertyIncomeExpenseDetailRow, type PropertyTabData } from "./types";

const today = new Date();

const PROPERTY_TYPES = ["一戸建て", "アパート", "マンション"] as const;
const MANAGEMENT_TYPES = ["一般管理", "サブリース", "自主管理"] as const;

const pad2 = (value: number) => value.toString().padStart(2, "0");

const createBaseRows = (seed: number): PropertyIncomeExpenseDetailRow[] => {
  let running = 0;

  return Array.from({ length: 200 }, (_, i) => {
    const income = i % 2 === 0 ? 40000 + i * 1000 + seed * 500 : 0;
    const expense = i % 2 !== 0 ? 50000 + i * 500 + seed * 250 : 0;

    running += income - expense;
    const balance = running;

    let expectedAmount = 120000 + i * 1000 + seed * 1000;
    let managementCompanyAmount = 120000 + i * 1000 + seed * 1000;

    const date = addDays(today, (i - 200) * 5);
    let yearMonth = format(date, "yyyy-MM");

    if (i > 0) {
      const prevMonth = format(addDays(today, (i - 199) * 5), "yyyy-MM");
      const nextMonth = format(addDays(today, (i - 201) * 5), "yyyy-MM");

      if (yearMonth !== prevMonth && yearMonth === nextMonth) {
        // Keep yearMonth and expected values at month break row only.
      } else {
        yearMonth = "";
        expectedAmount = 0;
        managementCompanyAmount = 0;
      }
    } else {
      yearMonth = "";
      expectedAmount = 0;
      managementCompanyAmount = 0;
    }

    return {
      id: `${seed + 1}-${i + 1}`,
      yearMonth,
      expectedAmount,
      managementCompanyAmount,
      transactionDate: format(date, "yyyy-MM-dd"),
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
  const propertyCode = `C-${pad2(seed + 1)}`;

  return {
    propertyCode,
    roomCode: `${100 + ((seed % 5) + 1)}`,
    managementType: MANAGEMENT_TYPES[seed % MANAGEMENT_TYPES.length],
    propertyType: PROPERTY_TYPES[seed % PROPERTY_TYPES.length],
    managementCompany: `管理会社${pad2((seed % 6) + 1)}`,
    managementPeriod: `2026-01-01 ～ 2026-12-31`,
  };
};

export const createPropertyTabs = (count = 30): PropertyTabData[] =>
  Array.from({ length: count }, (_, index) => ({
    id: `property-tab-${index + 1}`,
    label: `物件${pad2(index + 1)}`,
    header: createPropertyHeader(index),
    rows: createBaseRows(index),
  }));

export const initialPropertyTabs = createPropertyTabs();
