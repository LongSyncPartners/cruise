// utils/validators.ts

export type ValidationResult = {
  isValid: boolean;
  errorMessage?: string;
};

/**
 * Check required
 */
export const validateRequired = (
  value: unknown,
  label?: string
): ValidationResult => {
  if (value === null || value === undefined || value === "") {
    return {
      isValid: false,
      errorMessage: `${label?? "この項目"}は必須項目です`,
    };
  }

  return { isValid: true };
};

/**
 * Check max length
 */
export const validateMaxLength = (
  value: string,
  maxLength: number,
  label = "This field"
): ValidationResult => {
  if (!value) return { isValid: true };

  if (value.length > maxLength) {
    return {
      isValid: false,
      errorMessage: `${label??"この項目"}は${maxLength}文字以内で入力してください`,
    };
  }

  return { isValid: true };
};

/**
 * Combine multiple validators
 */
export const validate = (
  ...validators: ValidationResult[]
): ValidationResult => {
  for (const v of validators) {
    if (!v.isValid) return v;
  }
  return { isValid: true };
};