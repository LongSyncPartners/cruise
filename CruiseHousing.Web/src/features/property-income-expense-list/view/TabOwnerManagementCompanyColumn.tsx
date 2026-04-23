import type { GridColDef } from "@mui/x-data-grid";

import CurrencyCell from "../../shared/CurrencyCell";
import YearMonthCell from "../../shared/YearMonthCell";
import CreateHeaderEditable from "../../shared/CreateHeaderEditable";
import { TabOwnerManagementCompanyRow } from "../types";

type CreateTabOwnerManagementCompanyColumnsParams = {
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

export const createTabOwnerManagementCompanyColumns = ({
  onRenameHeader,
}: CreateTabOwnerManagementCompanyColumnsParams = {}): GridColDef<TabOwnerManagementCompanyRow>[] => {
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

    {
      field: "managementEntrust",
      headerName: "管理委託",
      headerClassName: "align-right-header",
      minWidth: 120,
      flex: 1,
      renderCell: (params) => <CurrencyCell {...params} showZero />,
      renderHeader: renderEditableHeader,
    },
    {
      field: "managementConsignment",
      headerName: "管理受託",
      headerClassName: "align-right-header",
      minWidth: 120,
      flex: 1,
      renderCell: (params) => <CurrencyCell {...params} showZero />,
      renderHeader: renderEditableHeader,
    },
    {
      field: "constructionDeposit",
      headerName: "工事預り金",
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
      field: "fee",
      headerName: "手数料",
      headerClassName: "align-right-header",
      minWidth: 120,
      flex: 1,
      renderCell: (params) => <CurrencyCell {...params} showZero />,
      renderHeader: renderEditableHeader,
    },
  ];
};