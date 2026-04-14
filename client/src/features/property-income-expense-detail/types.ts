import { type GridRowId } from "@mui/x-data-grid";

// Property income/expense detail row
export type PropertyIncomeExpenseDetailRow = {
  id: GridRowId;
  yearMonth: string;
  expectedAmount: number;
  managementCompanyAmount: number;
  transactionDate: string;
  counterparty: string;
  description: string;
  income: number;
  expense: number;
  balance: number;
  note?: string;
  rowColorType?: string; // For custom row coloring
  executedState: boolean; // For context menu toggle
};

export type PropertyHeaderProps = {
  propertyCode: string;
  roomCode?: string;
  managementType: string;
  propertyType: string;
  managementCompany: string;
  managementPeriod?: string;
  owner?: string;
};

/**
 * Tab summary only
 */
export type PropertyTabSummary = {
  id: string;
  label: string;
  header: PropertyHeaderProps;
};

/**
 * Full tab detail
 */
export type PropertyTabData = PropertyTabSummary & {
  rows: PropertyIncomeExpenseDetailRow[];
};

export type PropertyIncomeExpenseSummaryRow = {
  id: GridRowId;

  // 年月 (YYYYMM string format)
  yearMonth: string;

  // グループ1
  expectedAmount1: number | null;
  managementCompanyAmount1: number | null;
  difference1: number | null;

  // グループ2
  expectedAmount2: number | null;
  managementCompanyAmount2: number | null;
  difference2: number | null;

  // グループ3
  expectedAmount3: number | null;
  managementCompanyAmount3: number | null;
  difference3: number | null;
};

export type PropertyIncomeExpenseSummaryHeaderProps = {
  managementCompanies: string[];
  selectedManagementCompany: string;
  onManagementCompanyChange: (value: string) => void;

  years: number[];
  selectedYear: number;
  onYearChange: (value: number) => void;

  tabs: string[];

  onClickPrev: () => void;
  onClickNext: () => void;
};