import { v4 as uuidv4 } from "uuid";
import { type PropertyIncomeExpenseDetailRow } from "./types";

export const recalculateBalances = (
  rows: PropertyIncomeExpenseDetailRow[]
): PropertyIncomeExpenseDetailRow[] => {
  let running = 0;

  return rows.map((row) => {
    const income = Number(row.income ?? 0);
    const expense = Number(row.expense ?? 0);
    running += income - expense;

    return {
      ...row,
      balance: running,
    };
  });
};

export const createEmptyPropertyIncomeExpenseDetailRow = (
  balance = 0
): PropertyIncomeExpenseDetailRow => ({
  id: uuidv4(),
  yearMonth: "",
  expectedAmount: 0,
  managementCompanyAmount: 0,
  transactionDate: "",
  counterparty: "",
  description: "",
  income: 0,
  expense: 0,
  balance,
  note: "",
  executedState: false,
});