import {type GridRowId} from "@mui/x-data-grid";

// 物件収支明細データ
export type PropertyIncomeExpenseDetailRow = {
    id: GridRowId;
    yearMonth: string;                 // 年月（例：2026-04）
    expectedAmount: number;            // 本来入金額（予定されている入金額）
    managementCompanyAmount: number;   // 管理会社からの入金額
    transactionDate: string;           // 取引日（YYYY-MM-DD）
    counterparty: string;              // 支払先／入金元
    description: string;               // 内容（取引の説明）
    income: number;                    // 収入
    expense: number;                   // 支出
    balance: number;                   // 残高
    note?: string;                     // 備考
};

export type PropertyHeaderProps = {
  propertyCode: string;
  roomCode?: string;
  managementType: string;
  propertyType: string;
  managementCompany: string;
  managementPeriod?: string;
};