import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import { TabOwnerRow } from "../../types";
import CreateHeaderEditable from "@/features/shared/CreateHeaderEditable";
import YearMonthCell from "@/features/shared/YearMonthCell";
import CurrencyCell from "@/features/shared/CurrencyCell";
import { withContextMenu } from "@/features/shared/withContextMenu";
import { TAB_OWNER_COLUMN_LABELS } from "./ColumnLabels";

type CreateTabOwnerColumnsParams = {
  onRenameHeader?: (field: string, headerName: string) => void;
  onCellContextMenu: (
    params: GridRenderCellParams<TabOwnerRow>,
    event: React.MouseEvent<HTMLElement>
  ) => void;
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
  onCellContextMenu,
}: CreateTabOwnerColumnsParams): GridColDef<TabOwnerRow>[] => {
  const renderEditableHeader = createEditableHeader(onRenameHeader);

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
      renderCell: (p) => <YearMonthCell {...p} />,
      renderHeader: renderEditableHeader,
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
      renderHeader: renderEditableHeader,
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
      renderHeader: renderEditableHeader,
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
      renderHeader: renderEditableHeader,
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
      renderHeader: renderEditableHeader,
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
      renderHeader: renderEditableHeader,
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
      renderHeader: renderEditableHeader,
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
      renderHeader: renderEditableHeader,
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
      renderHeader: renderEditableHeader,
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
      renderHeader: renderEditableHeader,
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
      renderHeader: renderEditableHeader,
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
      renderHeader: renderEditableHeader,
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
      renderHeader: renderEditableHeader,
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
      renderHeader: renderEditableHeader,
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
      renderHeader: renderEditableHeader,
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
      renderHeader: renderEditableHeader,
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
      renderHeader: renderEditableHeader,
    }),
  ];
};