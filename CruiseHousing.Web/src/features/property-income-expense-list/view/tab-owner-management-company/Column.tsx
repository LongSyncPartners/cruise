import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import CurrencyCell from "../../../shared/CurrencyCell";
import YearMonthCell from "../../../shared/YearMonthCell";
import CreateHeaderEditable from "../../../shared/CreateHeaderEditable";
import { TabOwnerManagementCompanyRow } from "../../types";
import { withContextMenu } from "@/features/shared/withContextMenu";
import { TAB_OWNER_MANAGEMENT_COMPANY_COLUMN_LABELS } from "./ColumnLabels";

type CreateTabOwnerManagementCompanyColumnsParams = {
  onCellContextMenu: (
    params: GridRenderCellParams<TabOwnerManagementCompanyRow>,
    event: React.MouseEvent<HTMLElement>
  ) => void;
};

export const createTabOwnerManagementCompanyColumns = ({
  onCellContextMenu,
}: CreateTabOwnerManagementCompanyColumnsParams): GridColDef<TabOwnerManagementCompanyRow>[] => {

  const addContextMenu = (col: GridColDef<TabOwnerManagementCompanyRow>) =>
    withContextMenu(col, onCellContextMenu);

  return [
    addContextMenu({
      field: "yearMonth",
      headerName: TAB_OWNER_MANAGEMENT_COMPANY_COLUMN_LABELS.yearMonth,
      headerClassName: "align-center-header",
      width: 80,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <YearMonthCell {...params} disableDoubleClickToggle/>,
    }),

    addContextMenu({
      field: "managementEntrust",
      headerName:
        TAB_OWNER_MANAGEMENT_COMPANY_COLUMN_LABELS.managementEntrust,
      headerClassName: "align-right-header",
      minWidth: 100,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <CurrencyCell {...params} showZero />,
    }),
    addContextMenu({
      field: "managementConsignment",
      headerName:
        TAB_OWNER_MANAGEMENT_COMPANY_COLUMN_LABELS.managementConsignment,
      headerClassName: "align-right-header",
      minWidth: 100,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <CurrencyCell {...params} showZero />,
    }),
    addContextMenu({
      field: "constructionDeposit",
      headerName:
        TAB_OWNER_MANAGEMENT_COMPANY_COLUMN_LABELS.constructionDeposit,
      headerClassName: "align-right-header",
      minWidth: 110,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <CurrencyCell {...params} showZero />,
    }),
    addContextMenu({
      field: "repairCost",
      headerName: TAB_OWNER_MANAGEMENT_COMPANY_COLUMN_LABELS.repairCost,
      headerClassName: "align-right-header",
      minWidth: 100,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <CurrencyCell {...params} showZero />,
    }),
    addContextMenu({
      field: "fee",
      headerName: TAB_OWNER_MANAGEMENT_COMPANY_COLUMN_LABELS.fee,
      headerClassName: "align-right-header",
      minWidth: 100,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <CurrencyCell {...params} showZero />,
    }),
    {
      field: "empty",
      headerName: "",
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
    },
  ];
};