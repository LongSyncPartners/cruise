import { useCallback } from "react";
import type { GridRowModel } from "@mui/x-data-grid";

import type { PropertyIncomeExpenseDetailRow } from "../types";
import { getYearMonth, isSameMonth, parseCurrency } from "../../shared/utils";

export const usePropertyIncomeExpenseCalculation = () => {
  /**
   * Recalculate derived fields for all rows.
   * - balance: running balance
   * - expectedAmount: monthly total, set only on the last row of the month
   * - yearMonth: yyyy/MM, set only on the last row of the month
   */
  const recalculateRows = useCallback(
    (sourceRows: PropertyIncomeExpenseDetailRow[]): PropertyIncomeExpenseDetailRow[] => {
      const nextRows = sourceRows.map((row) => ({
        ...row,
        income: parseCurrency(row.income),
        expense: parseCurrency(row.expense),
      }));

      let running = 0;
      let monthlyExpectedAmount = 0;

      for (let i = 0; i < nextRows.length; i += 1) {
        const income = Number(nextRows[i].income ?? 0);
        const expense = Number(nextRows[i].expense ?? 0);
        const amount = income - expense;

        running += amount;

        if (
          i === 0 ||
          !isSameMonth(nextRows[i - 1].transactionDate, nextRows[i].transactionDate)
        ) {
          monthlyExpectedAmount = amount;
        } else {
          monthlyExpectedAmount += amount;
        }

        const isLastRow = i === nextRows.length - 1;
        const isEndOfMonth =
          isLastRow ||
          !isSameMonth(nextRows[i].transactionDate, nextRows[i + 1].transactionDate);

        nextRows[i] = {
          ...nextRows[i],
          balance: running,
          expectedAmount: isEndOfMonth ? monthlyExpectedAmount : 0,
          yearMonth: isEndOfMonth ? getYearMonth(nextRows[i].transactionDate) : "",
        };
      }

      return nextRows;
    },
    []
  );

  /**
   * Apply one edited row, then recalculate all rows.
   */
   const updateRowAndRecalculate = useCallback(
    (
      rows: PropertyIncomeExpenseDetailRow[],
      updatedRow: GridRowModel<PropertyIncomeExpenseDetailRow>
    ): {
      nextRows: PropertyIncomeExpenseDetailRow[];
      returnedRow: PropertyIncomeExpenseDetailRow;
    } => {
      const index = rows.findIndex((row) => row.id === updatedRow.id);

      if (index < 0) {
        return {
          nextRows: rows,
          returnedRow: updatedRow as PropertyIncomeExpenseDetailRow,
        };
      }

      const mergedRows = rows.map((row, i) =>
        i === index
          ? {
              ...row,
              ...updatedRow,
              income: parseCurrency(updatedRow.income),
              expense: parseCurrency(updatedRow.expense),
            }
          : row
      );

      const nextRows = recalculateRows(mergedRows);

      return {
        nextRows,
        returnedRow: nextRows[index],
      };
    },
    [recalculateRows]
  );

  return {
    recalculateRows,
    updateRowAndRecalculate,
  };
};