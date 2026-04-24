import type { GridColDef } from "@mui/x-data-grid";

import CurrencyCell from "../../shared/CurrencyCell";
import YearMonthCell from "../../shared/YearMonthCell";
import CreateHeaderEditable from "../../shared/CreateHeaderEditable";
import { TabOwnerRow } from "../types";

type CreateTabOwnerColumnsParams = {
  onRenameHeader?: (field: string, headerName: string) => void;
};

const createEditableHeader =
  (onRenameHeader?: (field: string, headerName: string) => void) =>
  (params: Parameters<NonNullable<GridColDef["renderHeader"]>>[0]) => (
    <CreateHeaderEditable
      value={params.colDef.headerName ?? ""}
      onChange={(newValue) => onRenameHeader?.(params.field, newValue)}
    />
  );

export const createTabOwnerColumns = ({
  onRenameHeader,
}: CreateTabOwnerColumnsParams = {}): GridColDef<TabOwnerRow>[] => {
  const renderEditableHeader = createEditableHeader(onRenameHeader);

  return [
    {
      field: "yearMonth",
      headerName: "年月",
      headerClassName: "align-center-header",
      width: 80,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (p) => <YearMonthCell {...p} />,
      renderHeader: renderEditableHeader,
    },

    // ===== 収入 =====
    {
      field: "totalIncomeAmount",
      headerName: "収入計",
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (p) => (
        <CurrencyCell {...p} showZero />
      ),
      renderHeader: renderEditableHeader,
    },
    {
      field: "subleaseRent",
      headerName: "ｻﾌﾞﾘｰｽ賃料",
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (p) => <CurrencyCell {...p} showZero />,
      renderHeader: renderEditableHeader,
    },
    {
      field: "otherIncomeAmount",
      headerName: "その他収入",
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (p) => <CurrencyCell {...p} showZero />,
      renderHeader: renderEditableHeader,
    },

    // ===== 支出 =====
    {
      field: "totalExpenseAmount",
      headerName: "支出計",
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (p) => (
        <CurrencyCell {...p} showZero />
      ),
      renderHeader: renderEditableHeader,
    },
    { 
      field: "managementFee", 
      headerName: "管理料", 
      headerClassName: "align-right-header", 
      minWidth: 100, 
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (p) => <CurrencyCell {...p} showZero />,
      renderHeader: renderEditableHeader 
    },
    { 
      field: "repairCost", 
      headerName: "修繕費", 
      headerClassName: "align-right-header",
      minWidth: 100, 
      flex: 1, 
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (p) => <CurrencyCell {...p} showZero />, 
      renderHeader: renderEditableHeader 
    },
    { 
      field: "constructionFee",
       headerName: "工事手数料",
       headerClassName: "align-right-header", 
       minWidth: 100, 
       flex: 1, 
       editable: false,
      sortable: false,
      filterable: false,
       renderCell: (p) => <CurrencyCell {...p} showZero />, 
       renderHeader: renderEditableHeader 
    },
    { 
      field: "gardenMaintenanceCost", 
      headerName: "庭手入れ",
      headerClassName: "align-right-header",
      minWidth: 100, 
      flex: 1, 
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (p) => <CurrencyCell {...p} showZero />, 
      renderHeader: renderEditableHeader },
    { 
      field: "fee", 
      headerName: "手数料", 
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1, 
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (p) => <CurrencyCell {...p} showZero />, 
      renderHeader: renderEditableHeader 
    },
    { 
      field: "propertyTax", 
      headerName: "固定資産税",
      headerClassName: "align-right-header",
      minWidth: 100, 
      flex: 1, 
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (p) => <CurrencyCell {...p} showZero />, 
      renderHeader: renderEditableHeader },
    { 
      field: "fireInsurance",
      headerName: "火災保険料", 
      headerClassName: "align-right-header",
      minWidth: 100, 
      flex: 1, 
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (p) => <CurrencyCell {...p} showZero />, 
      renderHeader: renderEditableHeader 
    },
    { 
      field: "floodInsurance", 
      headerName: "洪水保険料", 
      headerClassName: "align-right-header",
      minWidth: 100, 
      flex: 1, 
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (p) => <CurrencyCell {...p} showZero />, 
      renderHeader: renderEditableHeader 
    },
    { 
      field: "hoaDues", 
      headerName: "HOA Dues", 
      headerClassName: "align-right-header",
      minWidth: 100, 
      flex: 1, 
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (p) => <CurrencyCell {...p} showZero />, 
      renderHeader: renderEditableHeader 
    },
    { 
      field: "fixedRepairCost", 
      headerName: "定額修繕費", 
      headerClassName: "align-right-header",
      minWidth: 100, 
      flex: 1, 
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (p) => <CurrencyCell {...p} showZero />, 
      renderHeader: renderEditableHeader 
    },
    { 
      field: "otherExpenseAmount", 
      headerName: "その他支出", 
      headerClassName: "align-right-header",
      minWidth: 100, 
      flex: 1, 
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (p) => <CurrencyCell {...p} showZero />, 
      renderHeader: renderEditableHeader 
    },

    // ===== 結果 =====
    {
      field: "ownerPaymentAmount",
      headerName: "ｵｰﾅｰ支払額",
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (p) => (
        <CurrencyCell {...p} showZero />
      ),
      renderHeader: renderEditableHeader,
    },
  ];
};