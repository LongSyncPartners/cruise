import { type GridRowId } from "@mui/x-data-grid";

/** 
 * 物件別収支一覧画面 
 */

export type PropertyInfoProps = {
  propertyCode: string;
  roomCode?: string;
  managementType: string;
  propertyType: string;
  managementCompany: string;
  managementPeriod?: string;
  owner?: string;
};


/** 
 * 物件管理会社 タップ
 */
export type TabPropertyManagementCompanyRow = {
  id: GridRowId;

  // 年月 (YYYY/MM string format)
  yearMonth: string;

  // ===== 収入 =====
  rentAmount: number | null;              // 家賃
  otherIncomeAmount: number | null;       // その他収入
  totalIncomeAmount: number | null;       // 収入計

  // ===== 支出 =====
  managementFee: number | null;           // 管理料
  repairCost: number | null;              // 修繕費
  gardenMaintenanceCost: number | null;   // 庭手入れ
  brokerageFee: number | null;            // 仲介手数料
  otherExpenseAmount: number | null;      // その他支出
  totalExpenseAmount: number | null;      // 支出計

  // ===== 結果 =====
  netAmount: number | null;               // 差引計
  receivedAmount: number | null;          // 入金額
  differenceAmount: number | null;        // 差額

  executedState: boolean; // For context menu toggle
};

/** 
 * 物件管理会社 タップ
 */
export type TabOwnerManagementCompanyRow = {
  id: GridRowId;

  // 年月 (YYYY/MM)
  yearMonth: string;

  // ===== データ =====
  managementEntrust: number | null;     // 管理委託
  managementConsignment: number | null; // 管理受託
  constructionDeposit: number | null;   // 工事預り金
  repairCost: number | null;            // 修繕費
  fee: number | null;                  // 手数料

  executedState: boolean; // For context menu toggle
};

/** 
 * オーナー管理会社 タップ
 */
export type TabInternalOwnerRow = {
  id: GridRowId;

  // 年月 (YYYY/MM)
  yearMonth: string;

  // ===== 収入 =====
  totalIncomeAmount: number | null;      // 収入計
  rentAmount: number | null;             // 家賃
  otherIncomeAmount: number | null;      // その他収入

  // ===== 支出 =====
  totalExpenseAmount: number | null;     // 支出計
  managementFee: number | null;          // 管理料
  repairCost: number | null;             // 修繕費
  gardenMaintenanceCost: number | null;  // 庭手入れ
  brokerageFee: number | null;           // 仲介手数料
  subleaseCost: number | null;           // ｻﾌﾞﾘｰｽ原価
  otherExpenseAmount: number | null;     // その他支出
  extraPaymentCost: number | null;       // 別途支払費用

  // ===== 管理会社 =====
  managementCompanyIncome: number | null; // 管理会社収入

  executedState: boolean; // For context menu toggle
};

/** 
 * オーナー タップ
 */
export type TabOwnerRow = {
  id: GridRowId;

  // 年月 (YYYY/MM)
  yearMonth: string;

  // ===== 収入 =====
  totalIncomeAmount: number | null;   // 収入計
  subleaseRent: number | null;        // ｻﾌﾞﾘｰｽ賃料
  otherIncomeAmount: number | null;   // その他収入

  // ===== 支出 =====
  totalExpenseAmount: number | null;  // 支出計
  managementFee: number | null;       // 管理料
  repairCost: number | null;          // 修繕費
  constructionFee: number | null;     // 工事手数料
  gardenMaintenanceCost: number | null; // 庭手入れ
  fee: number | null;                // 手数料
  propertyTax: number | null;         // 固定資産税
  fireInsurance: number | null;       // 火災保険料
  floodInsurance: number | null;      // 洪水保険料
  hoaDues: number | null;             // HOA Dues
  fixedRepairCost: number | null;     // 定額修繕費
  otherExpenseAmount: number | null;  // その他支出

  // ===== 結果 =====
  ownerPaymentAmount: number | null;  // ｵｰﾅｰ支払額

  executedState: boolean; // For context menu toggle
};


/** 
 * 科目
 */
export type SubjectTabInfo = {
  code :  string;
  label : string;
}

/** 
 * 編集
 */
export type ListEditRow = {
  id: GridRowId;
  transactionDate: string | null;      // 年月日
  detailType: number;                  // 分類
  subject: string | null;              // 科目
  amount: number | null;               // 金額
  masterAmount: number | null;         // ﾏｽﾀｰ金額
  accountingSubjectName: string | null; // 会計データ科目名
  appliedSubjectAux: string | null;    // 適用欄科目補助
  debit: string | null;                // 借方
  debitAux: string | null;             // 借方補助
  credit: string | null;               // 貸方
  creditAux: string | null;            // 貸方補助
  uploadProcessedDate: string | null;
};