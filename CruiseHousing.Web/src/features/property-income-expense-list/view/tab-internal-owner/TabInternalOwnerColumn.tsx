import type { GridColDef } from "@mui/x-data-grid";

import CurrencyCell from "../../../shared/CurrencyCell";
import YearMonthCell from "../../../shared/YearMonthCell";
import CreateHeaderEditable from "../../../shared/CreateHeaderEditable";
import { TabInternalOwnerRow } from "../../types";

type CreateTabInternalOwnerColumnsParams = {
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

export const createTabInternalOwnerColumns = ({
  onRenameHeader,
}: CreateTabInternalOwnerColumnsParams = {}): GridColDef<TabInternalOwnerRow>[] => {
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
      renderCell: (params) => <YearMonthCell {...params} />,
      renderHeader: renderEditableHeader,
    },

    {
      field: "totalIncomeAmount",
      headerName: "収入計",
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <CurrencyCell {...params} showZero />
      ),
      renderHeader: renderEditableHeader,
    },
    {
      field: "rentAmount",
      headerName: "家賃",
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <CurrencyCell {...params} showZero />,
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
      renderCell: (params) => <CurrencyCell {...params} showZero />,
      renderHeader: renderEditableHeader,
    },

    {
      field: "totalExpenseAmount",
      headerName: "支出計",
      headerClassName: "align-right-header",
      minWidth: 110,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <CurrencyCell {...params} showZero />
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
      renderCell: (params) => <CurrencyCell {...params} showZero />,
      renderHeader: renderEditableHeader,
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
      renderCell: (params) => <CurrencyCell {...params} showZero />,
      renderHeader: renderEditableHeader,
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
      renderCell: (params) => <CurrencyCell {...params} showZero />,
      renderHeader: renderEditableHeader,
    },
    {
      field: "brokerageFee",
      headerName: "仲介手数料",
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <CurrencyCell {...params} showZero />,
      renderHeader: renderEditableHeader,
    },
    {
      field: "subleaseCost",
      headerName: "ｻﾌﾞﾘｰｽ原価",
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <CurrencyCell {...params} showZero />,
      renderHeader: renderEditableHeader,
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
      renderCell: (params) => <CurrencyCell {...params} showZero />,
      renderHeader: renderEditableHeader,
    },
    {
      field: "extraPaymentCost",
      headerName: "別途支払費用",
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <CurrencyCell {...params} showZero />,
      renderHeader: renderEditableHeader,
    },

    {
      field: "managementCompanyIncome",
      headerName: "管理会社収入",
      headerClassName: "align-right-header",
      minWidth: 120,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <CurrencyCell {...params} showZero />
      ),
      renderHeader: renderEditableHeader,
    },
  ];
};