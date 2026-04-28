import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import CurrencyCell from "../../../shared/CurrencyCell";
import YearMonthCell from "../../../shared/YearMonthCell";
import CreateHeaderEditable from "../../../shared/CreateHeaderEditable";
import { TabInternalOwnerRow } from "../../types";
import { withContextMenu } from "@/features/shared/withContextMenu";
import { TAB_INTERNAL_OWNER_COLUMN_LABELS } from "./ColumnLabels";

type CreateTabInternalOwnerColumnsParams = {
  onCellContextMenu: (
    params: GridRenderCellParams<TabInternalOwnerRow>,
    event: React.MouseEvent<HTMLElement>
  ) => void;
};

export const createTabInternalOwnerColumns = ({
  onCellContextMenu,
}: CreateTabInternalOwnerColumnsParams): GridColDef<TabInternalOwnerRow>[] => {

  const addContextMenu = (col: GridColDef<TabInternalOwnerRow>) =>
    withContextMenu(col, onCellContextMenu);

  return [
    addContextMenu({
      field: "yearMonth",
      headerName: TAB_INTERNAL_OWNER_COLUMN_LABELS.yearMonth,
      headerClassName: "align-center-header",
      width: 80,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <YearMonthCell {...params} />,
    }),

    addContextMenu({
      field: "totalIncomeAmount",
      headerName: TAB_INTERNAL_OWNER_COLUMN_LABELS.totalIncomeAmount,
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <CurrencyCell {...params} showZero />,
    }),
    addContextMenu({
      field: "rentAmount",
      headerName: TAB_INTERNAL_OWNER_COLUMN_LABELS.rentAmount,
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
      headerName: TAB_INTERNAL_OWNER_COLUMN_LABELS.otherIncomeAmount,
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
      headerName: TAB_INTERNAL_OWNER_COLUMN_LABELS.totalExpenseAmount,
      headerClassName: "align-right-header",
      minWidth: 110,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <CurrencyCell {...params} showZero />,
    }),
    addContextMenu({
      field: "managementFee",
      headerName: TAB_INTERNAL_OWNER_COLUMN_LABELS.managementFee,
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
      headerName: TAB_INTERNAL_OWNER_COLUMN_LABELS.repairCost,
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
      headerName: TAB_INTERNAL_OWNER_COLUMN_LABELS.gardenMaintenanceCost,
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
      headerName: TAB_INTERNAL_OWNER_COLUMN_LABELS.brokerageFee,
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <CurrencyCell {...params} showZero />,
    }),
    addContextMenu({
      field: "subleaseCost",
      headerName: TAB_INTERNAL_OWNER_COLUMN_LABELS.subleaseCost,
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
      headerName: TAB_INTERNAL_OWNER_COLUMN_LABELS.otherExpenseAmount,
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <CurrencyCell {...params} showZero />,
    }),
    addContextMenu({
      field: "extraPaymentCost",
      headerName: TAB_INTERNAL_OWNER_COLUMN_LABELS.extraPaymentCost,
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <CurrencyCell {...params} showZero />,
    }),

    addContextMenu({
      field: "managementCompanyIncome",
      headerName: TAB_INTERNAL_OWNER_COLUMN_LABELS.managementCompanyIncome,
      headerClassName: "align-right-header",
      minWidth: 120,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <CurrencyCell {...params} showZero />,
    }),
  ];
};