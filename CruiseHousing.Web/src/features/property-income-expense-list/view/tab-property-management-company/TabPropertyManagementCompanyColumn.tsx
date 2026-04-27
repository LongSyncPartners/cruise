import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import CurrencyCell from "../../../shared/CurrencyCell";
import YearMonthCell from "../../../shared/YearMonthCell";
import CreateHeaderEditable from "../../../shared/CreateHeaderEditable";
import { TabPropertyManagementCompanyRow } from "../../types";
import { withContextMenu } from "@/features/shared/withContextMenu";
import { TAB_PROPERTY_MANAGEMENT_COMPANY_COLUMN_LABELS } from "./TabPropertyManagementCompanyColumnLabels";

type CreateTabPropertyManagementCompanyColumnsParams = {
  onRenameHeader?: (field: string, headerName: string) => void;
  onCellContextMenu: (
    params: GridRenderCellParams<TabPropertyManagementCompanyRow>,
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

export const createTabPropertyManagementCompanyColumns = ({
  onRenameHeader,
  onCellContextMenu,
}: CreateTabPropertyManagementCompanyColumnsParams): GridColDef<TabPropertyManagementCompanyRow>[] => {
  const renderEditableHeader = createEditableHeader(onRenameHeader);

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
      renderHeader: renderEditableHeader,
    }),

    addContextMenu({
      field: "rentAmount",
      headerName: TAB_PROPERTY_MANAGEMENT_COMPANY_COLUMN_LABELS.rentAmount,
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1,
      renderCell: (params) => <CurrencyCell {...params} showZero />,
      renderHeader: renderEditableHeader,
    }),
    addContextMenu({
      field: "otherIncomeAmount",
      headerName:
        TAB_PROPERTY_MANAGEMENT_COMPANY_COLUMN_LABELS.otherIncomeAmount,
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1,
      renderCell: (params) => <CurrencyCell {...params} showZero />,
      renderHeader: renderEditableHeader,
    }),
    addContextMenu({
      field: "totalIncomeAmount",
      headerName:
        TAB_PROPERTY_MANAGEMENT_COMPANY_COLUMN_LABELS.totalIncomeAmount,
      headerClassName: "align-right-header",
      minWidth: 100,
      flex: 1,
      renderCell: (params) => <CurrencyCell {...params} showZero />,
      renderHeader: renderEditableHeader,
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
      renderHeader: renderEditableHeader,
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
      renderHeader: renderEditableHeader,
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
      renderHeader: renderEditableHeader,
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
      renderHeader: renderEditableHeader,
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
      renderHeader: renderEditableHeader,
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
      renderHeader: renderEditableHeader,
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
      renderHeader: renderEditableHeader,
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
      renderHeader: renderEditableHeader,
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
      renderHeader: renderEditableHeader,
    }),
  ];
};