import { useCallback } from "react";
import { validateRequired, validateMaxLength } from "../../shared/validators";
import { type PropertyIncomeExpenseDetailRow } from "../types";

type ValidationResult = {
  isValid: boolean;
  errorMessage?: string;
};

/**
 * Validate yyyy/MM/dd or yyyy-MM-dd and real date
 */
const isValidDateValue = (value: string | null | undefined): boolean => {
  if (!value) return false;

  const normalized = value.replace(/-/g, "/");

  const regex = /^\d{4}\/\d{2}\/\d{2}$/;
  if (!regex.test(normalized)) return false;

  const [y, m, d] = normalized.split("/").map(Number);
  const date = new Date(y, m - 1, d);

  return (
    date.getFullYear() === y &&
    date.getMonth() + 1 === m &&
    date.getDate() === d
  );
};

/**
 * Validate number (currency fields)
 */
const isValidNumber = (value: unknown): boolean => {
  if (value === null || value === undefined || value === "") return true;
  return !isNaN(Number(value));
};

export const usePropertyIncomeExpenseValidation = () => {
  /**
   * Validate single row
   */
  const validateRow = useCallback(
    (row: PropertyIncomeExpenseDetailRow): ValidationResult => {
      // Date
      if (!row.transactionDate || !isValidDateValue(row.transactionDate)) {
        return {
          isValid: false,
          errorMessage: "日付は正しい形式で入力してください。",
        };
      }

      // Counterparty
      const counterpartyRequired = validateRequired(
        row.counterparty,
        "取引先"
      );
      if (!counterpartyRequired.isValid) return counterpartyRequired;

      const counterpartyLength = validateMaxLength(
        row.counterparty ?? "",
        40,
        "取引先"
      );
      if (!counterpartyLength.isValid) return counterpartyLength;

      // Description
      const descriptionRequired = validateRequired(
        row.description,
        "説明"
      );
      if (!descriptionRequired.isValid) return descriptionRequired;

      // Currency fields
      if (!isValidNumber(row.managementCompanyAmount)) {
        return {
          isValid: false,
          errorMessage: "管理会社入金は数値で入力してください。",
        };
      }

      if (!isValidNumber(row.income)) {
        return {
          isValid: false,
          errorMessage: "Incomeは数値で入力してください。",
        };
      }

      if (!isValidNumber(row.expense)) {
        return {
          isValid: false,
          errorMessage: "Expenseは数値で入力してください。",
        };
      }

      return { isValid: true };
    },
    []
  );

  /**
   * Validate all rows (for Save button)
   */
  const validateRows = useCallback(
    (rows: PropertyIncomeExpenseDetailRow[]): ValidationResult => {
      for (const row of rows) {
        const result = validateRow(row);
        if (!result.isValid) {
          return {
            isValid: false,
            errorMessage: result.errorMessage,
          };
        }
      }

      return { isValid: true };
    },
    [validateRow]
  );

  return {
    validateRow,
    validateRows,
  };
};