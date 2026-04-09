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