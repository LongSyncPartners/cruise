import { GridPreProcessEditCellProps } from "@mui/x-data-grid";
import { validate, validateMaxLength, validateRequired } from "./validators";

type CreateTextCellValidatorParams = {
  label?: string;
  maxLength?: number;
  required?: boolean;
};

type CreateDateCellValidatorParams = {
  label?: string;
  required?: boolean;
};

/**
 * Validate date format yyyy/MM/dd and valid date
 */
const validateDate = (value: string, label?: string) => {
  if (!value) return { isValid: true };

  // yyyy/MM/dd format
  const regex = /^\d{4}\/\d{2}\/\d{2}$/;
  if (!regex.test(value)) {
    return {
      isValid: false,
      errorMessage: `${label ?? "この項目"}はyyyy/MM/dd形式で入力してください`,
    };
  }

  const [y, m, d] = value.split("/").map(Number);
  const date = new Date(y, m - 1, d);

  // check real date (e.g. 2026/02/30 ❌)
  if (
    date.getFullYear() !== y ||
    date.getMonth() + 1 !== m ||
    date.getDate() !== d
  ) {
    return {
      isValid: false,
      errorMessage: `${label ?? "この項目"}は正しい日付を入力してください`,
    };
  }

  return { isValid: true };
};

/**
 * Text validator (existing)
 */
export const createTextCellValidator =
  ({ label, maxLength = 100, required = false }: CreateTextCellValidatorParams) =>
  (params: GridPreProcessEditCellProps) => {
    const value = (params.props.value as string) ?? "";

    const validationResult = validate(
      ...(required ? [validateRequired(value, label)] : []),
      validateMaxLength(value, maxLength, label)
    );

    return {
      ...params.props,
      error: !validationResult.isValid,
      helperText: validationResult.errorMessage,
    };
  };

/**
 * Date validator (new)
 */
export const createDateCellValidator =
  ({ label, required = false }: CreateDateCellValidatorParams) =>
  (params: GridPreProcessEditCellProps) => {
    const value = (params.props.value as string) ?? "";

    const validationResult = validate(
      ...(required ? [validateRequired(value, label)] : []),
      validateDate(value, label)
    );

    return {
      ...params.props,
      error: !validationResult.isValid,
      helperText: validationResult.errorMessage,
    };
  };