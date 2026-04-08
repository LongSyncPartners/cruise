export const propertyIncomeExpenseDetailKeys = {
  all: ["propertyIncomeExpenseDetail"] as const,

  tabs: (propertyCode: string) =>
    [...propertyIncomeExpenseDetailKeys.all, "tabs", propertyCode] as const,

  tab: (propertyCode: string) =>
    [...propertyIncomeExpenseDetailKeys.all, "tab", propertyCode] as const,

  rows: (propertyCode: string) =>
    [...propertyIncomeExpenseDetailKeys.all, "rows", propertyCode] as const,

  detail: (propertyCode: string) =>
    [...propertyIncomeExpenseDetailKeys.all, "detail", propertyCode] as const,
  
  saveRows: (propertyCode: string) =>
    [...propertyIncomeExpenseDetailKeys.all, "saveRows", propertyCode] as const,
};