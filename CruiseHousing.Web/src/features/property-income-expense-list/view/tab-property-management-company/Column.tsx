import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import CurrencyCell from "../../../shared/CurrencyCell";
import YearMonthCell from "../../../shared/YearMonthCell";
import CreateHeaderEditable from "../../../shared/CreateHeaderEditable";
import { TabPropertyManagementCompanyRow } from "../../types";
import { withContextMenu } from "@/features/shared/withContextMenu";
import { TAB_PROPERTY_MANAGEMENT_COMPANY_COLUMN_LABELS } from "./ColumnLabels";

type CreateTabPropertyManagementCompanyColumnsParams = {
  onCellContextMenu: (
    params: GridRenderCellParams<TabPropertyManagementCompanyRow>,
    event: React.MouseEvent<HTMLElement>
  ) => void;
};

export const createTabPropertyManagementCompanyColumns = ({
  onCellContextMenu,
}: CreateTabPropertyManagementCompanyColumnsParams): GridColDef<TabPropertyManagementCompanyRow>[] => {

  const addContextMenu = (col: GridColDef<TabPropertyManagementCompanyRow>) =>
    withContextMenu(col, onCellContextMenu);

  return [
    addContextMenu({
      field: "yearMonth",
      headerName: TAB_PROPERTY_MANAGEMENT_COMPANY_COLUMN_LABELS.yearMonth,
      headerClassName: "align-center-header",
      width: 80,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <YearMonthCell {...params} />,
    }),

    addContextMenu({
      field: "rentAmount",
      headerName: TAB_PROPERTY_MANAGEMENT_COMPANY_COLUMN_LABELS.rentAmount,
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <CurrencyCell {...params} showZero />,
    }),
    addContextMenu({
      field: "otherIncomeAmount",
      headerName:
        TAB_PROPERTY_MANAGEMENT_COMPANY_COLUMN_LABELS.otherIncomeAmount,
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <CurrencyCell {...params} showZero />,
    }),
    addContextMenu({
      field: "totalIncomeAmount",
      headerName:
        TAB_PROPERTY_MANAGEMENT_COMPANY_COLUMN_LABELS.totalIncomeAmount,
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <CurrencyCell {...params} showZero />,
    }),

    addContextMenu({
      field: "managementFee",
      headerName: TAB_PROPERTY_MANAGEMENT_COMPANY_COLUMN_LABELS.managementFee,
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <CurrencyCell {...params} showZero />,
    }),
    addContextMenu({
      field: "repairCost",
      headerName: TAB_PROPERTY_MANAGEMENT_COMPANY_COLUMN_LABELS.repairCost,
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <CurrencyCell {...params} showZero />,
    }),
    addContextMenu({
      field: "gardenMaintenanceCost",
      headerName:
        TAB_PROPERTY_MANAGEMENT_COMPANY_COLUMN_LABELS.gardenMaintenanceCost,
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <CurrencyCell {...params} showZero />,
    }),
    addContextMenu({
      field: "brokerageFee",
      headerName: TAB_PROPERTY_MANAGEMENT_COMPANY_COLUMN_LABELS.brokerageFee,
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <CurrencyCell {...params} showZero />,
    }),
    addContextMenu({
      field: "otherExpenseAmount",
      headerName:
        TAB_PROPERTY_MANAGEMENT_COMPANY_COLUMN_LABELS.otherExpenseAmount,
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <CurrencyCell {...params} showZero />,
    }),
    addContextMenu({
      field: "totalExpenseAmount",
      headerName:
        TAB_PROPERTY_MANAGEMENT_COMPANY_COLUMN_LABELS.totalExpenseAmount,
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <CurrencyCell {...params} showZero />,
    }),

    addContextMenu({
      field: "netAmount",
      headerName: TAB_PROPERTY_MANAGEMENT_COMPANY_COLUMN_LABELS.netAmount,
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <CurrencyCell {...params} showZero />,
    }),
    addContextMenu({
      field: "receivedAmount",
      headerName: TAB_PROPERTY_MANAGEMENT_COMPANY_COLUMN_LABELS.receivedAmount,
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <CurrencyCell {...params} showZero />,
    }),
    addContextMenu({
      field: "differenceAmount",
      headerName:
        TAB_PROPERTY_MANAGEMENT_COMPANY_COLUMN_LABELS.differenceAmount,
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <CurrencyCell {...params} showZero />,
    }),
  ];
};