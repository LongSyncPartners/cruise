import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import { TabOwnerRow } from "../../types";
import CreateHeaderEditable from "@/features/shared/CreateHeaderEditable";
import YearMonthCell from "@/features/shared/YearMonthCell";
import CurrencyCell from "@/features/shared/CurrencyCell";
import { withContextMenu } from "@/features/shared/withContextMenu";
import { TAB_OWNER_COLUMN_LABELS } from "./ColumnLabels";

type CreateTabOwnerColumnsParams = {
  onCellContextMenu: (
    params: GridRenderCellParams<TabOwnerRow>,
    event: React.MouseEvent<HTMLElement>
  ) => void;
};

export const createTabOwnerColumns = ({
  onCellContextMenu,
}: CreateTabOwnerColumnsParams): GridColDef<TabOwnerRow>[] => {

  const addContextMenu = (col: GridColDef<TabOwnerRow>) =>
    withContextMenu(col, onCellContextMenu);

  return [
    addContextMenu({
      field: "yearMonth",
      headerName: TAB_OWNER_COLUMN_LABELS.yearMonth,
      headerClassName: "align-center-header",
      width: 80,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (p) => <YearMonthCell {...p} disableDoubleClickToggle/>,
    }),

    addContextMenu({
      field: "totalIncomeAmount",
      headerName: TAB_OWNER_COLUMN_LABELS.totalIncomeAmount,
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (p) => <CurrencyCell {...p} showZero />,
    }),
    addContextMenu({
      field: "subleaseRent",
      headerName: TAB_OWNER_COLUMN_LABELS.subleaseRent,
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (p) => <CurrencyCell {...p} showZero />,
    }),
    addContextMenu({
      field: "otherIncomeAmount",
      headerName: TAB_OWNER_COLUMN_LABELS.otherIncomeAmount,
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (p) => <CurrencyCell {...p} showZero />,
    }),

    addContextMenu({
      field: "totalExpenseAmount",
      headerName: TAB_OWNER_COLUMN_LABELS.totalExpenseAmount,
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (p) => <CurrencyCell {...p} showZero />,
    }),
    addContextMenu({
      field: "managementFee",
      headerName: TAB_OWNER_COLUMN_LABELS.managementFee,
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (p) => <CurrencyCell {...p} showZero />,
    }),
    addContextMenu({
      field: "repairCost",
      headerName: TAB_OWNER_COLUMN_LABELS.repairCost,
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (p) => <CurrencyCell {...p} showZero />,
    }),
    addContextMenu({
      field: "constructionFee",
      headerName: TAB_OWNER_COLUMN_LABELS.constructionFee,
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (p) => <CurrencyCell {...p} showZero />,
    }),
    addContextMenu({
      field: "gardenMaintenanceCost",
      headerName: TAB_OWNER_COLUMN_LABELS.gardenMaintenanceCost,
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (p) => <CurrencyCell {...p} showZero />,
    }),
    addContextMenu({
      field: "fee",
      headerName: TAB_OWNER_COLUMN_LABELS.fee,
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (p) => <CurrencyCell {...p} showZero />,
    }),
    addContextMenu({
      field: "propertyTax",
      headerName: TAB_OWNER_COLUMN_LABELS.propertyTax,
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (p) => <CurrencyCell {...p} showZero />,
    }),
    addContextMenu({
      field: "fireInsurance",
      headerName: TAB_OWNER_COLUMN_LABELS.fireInsurance,
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (p) => <CurrencyCell {...p} showZero />,
    }),
    addContextMenu({
      field: "floodInsurance",
      headerName: TAB_OWNER_COLUMN_LABELS.floodInsurance,
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (p) => <CurrencyCell {...p} showZero />,
    }),
    addContextMenu({
      field: "hoaDues",
      headerName: TAB_OWNER_COLUMN_LABELS.hoaDues,
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (p) => <CurrencyCell {...p} showZero />,
    }),
    addContextMenu({
      field: "fixedRepairCost",
      headerName: TAB_OWNER_COLUMN_LABELS.fixedRepairCost,
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (p) => <CurrencyCell {...p} showZero />,
    }),
    addContextMenu({
      field: "otherExpenseAmount",
      headerName: TAB_OWNER_COLUMN_LABELS.otherExpenseAmount,
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (p) => <CurrencyCell {...p} showZero />,
    }),

    addContextMenu({
      field: "ownerPaymentAmount",
      headerName: TAB_OWNER_COLUMN_LABELS.ownerPaymentAmount,
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (p) => <CurrencyCell {...p} showZero />,
    }),
  ];
};