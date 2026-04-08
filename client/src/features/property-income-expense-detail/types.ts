import { type GridRowId } from "@mui/x-data-grid";

// 物件収支明細データ
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

export type PropertyTabData = {
  id: string;
  label: string;
  header: PropertyHeaderProps;
  rows: PropertyIncomeExpenseDetailRow[];
};
