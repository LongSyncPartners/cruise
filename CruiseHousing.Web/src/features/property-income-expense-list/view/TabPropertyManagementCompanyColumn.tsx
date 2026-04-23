import type { GridColDef } from "@mui/x-data-grid";

import CurrencyCell from "../../shared/CurrencyCell";
import YearMonthCell from "../../shared/YearMonthCell";
import CreateHeaderEditable from "../../shared/CreateHeaderEditable";
import { TabPropertyManagementCompanyRow } from "../types";

type CreateTabPropertyManagementCompanyColumnsParams = {
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

export const createTabPropertyManagementCompanyColumns = ({
  onRenameHeader,
}: CreateTabPropertyManagementCompanyColumnsParams = {}): GridColDef<TabPropertyManagementCompanyRow>[] => {
  const renderEditableHeader = createEditableHeader(onRenameHeader);

  return [
    {
      field: "yearMonth",
      headerName: "年月",
      headerClassName: "align-right-header",
      width: 100,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <YearMonthCell {...params} />,
      renderHeader: renderEditableHeader,
    },

    // ===== 收入 =====
    {
      field: "rentAmount",
      headerName: "家賃",
      headerClassName: "align-right-header",
      minWidth: 120,
      flex: 1,
      renderCell: (params) => <CurrencyCell {...params} showZero />,
      renderHeader: renderEditableHeader,
    },
    {
      field: "otherIncomeAmount",
      headerName: "その他収入",
      headerClassName: "align-right-header",
      minWidth: 120,
      flex: 1,
      renderCell: (params) => <CurrencyCell {...params} showZero />,
      renderHeader: renderEditableHeader,
    },
    {
      field: "totalIncomeAmount",
      headerName: "収入計",
      headerClassName: "align-right-header",
      minWidth: 120,
      flex: 1,
      renderCell: (params) => (
        <CurrencyCell {...params} showZero showNotZeroBackgroundColor />
      ),
      renderHeader: renderEditableHeader,
    },

    // ===== 支出 =====
    {
      field: "managementFee",
      headerName: "管理料",
      headerClassName: "align-right-header",
      minWidth: 120,
      flex: 1,
      renderCell: (params) => <CurrencyCell {...params} showZero />,
      renderHeader: renderEditableHeader,
    },
    {
      field: "repairCost",
      headerName: "修繕費",
      headerClassName: "align-right-header",
      minWidth: 120,
      flex: 1,
      renderCell: (params) => <CurrencyCell {...params} showZero />,
      renderHeader: renderEditableHeader,
    },
    {
      field: "gardenMaintenanceCost",
      headerName: "庭手入れ",
      headerClassName: "align-right-header",
      minWidth: 120,
      flex: 1,
      renderCell: (params) => <CurrencyCell {...params} showZero />,
      renderHeader: renderEditableHeader,
    },
    {
      field: "brokerageFee",
      headerName: "仲介手数料",
      headerClassName: "align-right-header",
      minWidth: 120,
      flex: 1,
      renderCell: (params) => <CurrencyCell {...params} showZero />,
      renderHeader: renderEditableHeader,
    },
    {
      field: "otherExpenseAmount",
      headerName: "その他支出",
      headerClassName: "align-right-header",
      minWidth: 120,
      flex: 1,
      renderCell: (params) => <CurrencyCell {...params} showZero />,
      renderHeader: renderEditableHeader,
    },
    {
      field: "totalExpenseAmount",
      headerName: "支出計",
      headerClassName: "align-right-header",
      minWidth: 120,
      flex: 1,
      renderCell: (params) => (
        <CurrencyCell {...params} showZero showNotZeroBackgroundColor />
      ),
      renderHeader: renderEditableHeader,
    },

    // ===== 結果 =====
    {
      field: "netAmount",
      headerName: "差引計",
      headerClassName: "align-right-header",
      minWidth: 120,
      flex: 1,
      renderCell: (params) => (
        <CurrencyCell {...params} showZero showNotZeroBackgroundColor />
      ),
      renderHeader: renderEditableHeader,
    },
    {
      field: "receivedAmount",
      headerName: "入金額",
      headerClassName: "align-right-header",
      minWidth: 120,
      flex: 1,
      renderCell: (params) => <CurrencyCell {...params} showZero />,
      renderHeader: renderEditableHeader,
    },
    {
      field: "differenceAmount",
      headerName: "差額",
      headerClassName: "align-right-header",
      minWidth: 120,
      flex: 1,
      renderCell: (params) => (
        <CurrencyCell
          {...params}
          showZero
          showNotZeroBackgroundColor
        />
      ),
      renderHeader: renderEditableHeader,
    },
  ];
};