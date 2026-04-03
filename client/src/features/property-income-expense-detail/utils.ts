import { PropertyIncomeExpenseDetailRow } from "./types";

export const parseCurrencyInput = (value: unknown): number | null => {
  if (value == null) return null;

  const raw = String(value).replace(/[$,\s]/g, "");
  if (raw === "") return null;

  const num = Number(raw);
  return Number.isNaN(num) ? null : num;
};

export const calculateRunningBalance = (
  rows: Array<Omit<PropertyIncomeExpenseDetailRow, "balance">>
): PropertyIncomeExpenseDetailRow[] => {
  let runningBalance = 0;

  return rows.map((row) => {
    const income = Number(row.income ?? 0);
    const expense = Number(row.expense ?? 0);

    runningBalance += income - expense;

    return {
      ...row,
      balance: runningBalance,
    };
  });
};