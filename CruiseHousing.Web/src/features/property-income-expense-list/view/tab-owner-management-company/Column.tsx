import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import CurrencyCell from "../../../shared/CurrencyCell";
import YearMonthCell from "../../../shared/YearMonthCell";
import CreateHeaderEditable from "../../../shared/CreateHeaderEditable";
import { TabOwnerManagementCompanyRow } from "../../types";
import { withContextMenu } from "@/features/shared/withContextMenu";
import { TAB_OWNER_MANAGEMENT_COMPANY_COLUMN_LABELS } from "./ColumnLabels";

type CreateTabOwnerManagementCompanyColumnsParams = {
  onRenameHeader?: (field: string, headerName: string) => void;
  onCellContextMenu: (
    params: GridRenderCellParams<TabOwnerManagementCompanyRow>,
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

export const createTabOwnerManagementCompanyColumns = ({
  onRenameHeader,
  onCellContextMenu,
}: CreateTabOwnerManagementCompanyColumnsParams): GridColDef<TabOwnerManagementCompanyRow>[] => {
  const renderEditableHeader = createEditableHeader(onRenameHeader);

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
      renderCell: (params) => <YearMonthCell {...params} />,
      renderHeader: renderEditableHeader,
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
      renderHeader: renderEditableHeader,
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
      renderHeader: renderEditableHeader,
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
      renderHeader: renderEditableHeader,
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
      renderHeader: renderEditableHeader,
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
      renderHeader: renderEditableHeader,
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