export const propertyIncomeExpenseListKeys = {
  all: ["propertyIncomeExpenseList"] as const,

  groups: () =>
    [...propertyIncomeExpenseListKeys.all, "groups"] as const,

  tabsByGroup: (group: string) =>
    [...propertyIncomeExpenseListKeys.all, "tabsByGroup", group] as const,

  defaultPropertyCode: (group: string) =>
    [...propertyIncomeExpenseListKeys.all, "defaultPropertyCode", group] as const,

  tabs: (propertyCode: string) =>
    [...propertyIncomeExpenseListKeys.all, "tabs", propertyCode] as const,

  tab: (propertyCode: string) =>
    [...propertyIncomeExpenseListKeys.all, "tab", propertyCode] as const,

  rows: (propertyCode: string) =>
    [...propertyIncomeExpenseListKeys.all, "rows", propertyCode] as const,

  detail: (propertyCode: string) =>
    [...propertyIncomeExpenseListKeys.all, "detail", propertyCode] as const,

  saveRows: (propertyCode: string) =>
    [...propertyIncomeExpenseListKeys.all, "saveRows", propertyCode] as const,
};