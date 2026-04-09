import { GridRowModel } from "@mui/x-data-grid";
import { parseCurrency } from "../shared/utils";
import { PropertyIncomeExpenseDetailRow } from "./types";


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

export const shouldRecalculateRow = (
  currentRow: PropertyIncomeExpenseDetailRow,
  updatedRow: GridRowModel<PropertyIncomeExpenseDetailRow>
): boolean => {
  return (
    parseCurrency(currentRow.income) !== parseCurrency(updatedRow.income) ||
    parseCurrency(currentRow.expense) !== parseCurrency(updatedRow.expense) ||
    (currentRow.transactionDate ?? "") !== (updatedRow.transactionDate ?? "")
  );
};