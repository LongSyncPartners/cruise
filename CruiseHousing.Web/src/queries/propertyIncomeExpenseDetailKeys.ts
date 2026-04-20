export const propertyIncomeExpenseDetailKeys = {
  all: ["propertyIncomeExpenseDetail"] as const,

  groups: () =>
  [...propertyIncomeExpenseDetailKeys.all, "groups"] as const,

  tabsByGroup: (group: string) =>
  [...propertyIncomeExpenseDetailKeys.all, "tabsByGroup", group] as const,

  defaultPropertyCode: (group: string) =>
  [...propertyIncomeExpenseDetailKeys.all, "defaultPropertyCode", group] as const,

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

   managementCompanies: () =>
    [...propertyIncomeExpenseDetailKeys.all, "managementCompanies"] as const,

  groupTabs: (companyCode: string) =>
    [...propertyIncomeExpenseDetailKeys.all, "tabs", companyCode] as const,

  propertyIncomeExpenseSummaryRows: (companyCode: string, year: number) =>
    [...propertyIncomeExpenseDetailKeys.all, "rows", companyCode, year] as const,
};