import type { GridColDef } from "@mui/x-data-grid";

import CurrencyCell from "../shared/CurrencyCell";
import YearMonthCell from "../shared/YearMonthCell";
import CreateHeaderEditable from "../shared/CreateHeaderEditable";
import { PropertyIncomeExpenseSummaryRow } from "./types";

type CreatePropertyIncomeExpenseSummaryColumnsParams = {
  onRenameHeader?: (field: string, headerName: string) => void;
};

const createEditableHeader =
  (onRenameHeader?: (field: string, headerName: string) => void) =>
  (params: Parameters<NonNullable<GridColDef["renderHeader"]>>[0]) =>
    (
      <CreateHeaderEditable
        value={params.colDef.headerName ?? ""}
        onChange={(newValue) => onRenameHeader?.(params.field, newValue)}
      />
    );

export const createPropertyIncomeExpenseSummaryColumns = ({
  onRenameHeader,
}: CreatePropertyIncomeExpenseSummaryColumnsParams = {}): GridColDef<PropertyIncomeExpenseSummaryRow>[] => {
  
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
    },
    {
      field: "expectedAmountSummary",
      headerName: "本来入金額",
      headerClassName: "align-right-header",
      minWidth: 120,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <CurrencyCell {...params} showZero={true} />,
    },
    {
      field: "managementCompanyAmountSummary",
      headerName: "管理会社入金",
      headerClassName: "align-right-header",
      minWidth: 120,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <CurrencyCell {...params} showZero={true} />,
    },
    {
      field: "differenceSummary",
      headerName: "差額",
      headerClassName: "align-right-header",
      minWidth: 120,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <CurrencyCell
          {...params}
          showZero={true}
          showNotZeroBackgroundColor={true}
        />
      ),
    },
    {
      field: "expectedAmount1",
      headerName: "本来入金額",
      headerClassName: "align-right-header",
      minWidth: 120,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <CurrencyCell {...params} showZero={true} />,
    },
    {
      field: "managementCompanyAmount1",
      headerName: "管理会社入金",
      headerClassName: "align-right-header",
      minWidth: 120,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <CurrencyCell {...params} showZero={true} />,
    },
    {
      field: "difference1",
      headerName: "差額",
      headerClassName: "align-right-header",
      minWidth: 120,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <CurrencyCell
          {...params}
          showZero={true}
          showNotZeroBackgroundColor={true}
        />
      ),
    },
    {
      field: "expectedAmount2",
      headerName: "本来入金額",
      headerClassName: "align-right-header",
      minWidth: 120,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <CurrencyCell {...params} showZero={true} />,
    },
    {
      field: "managementCompanyAmount2",
      headerName: "管理会社入金",
      headerClassName: "align-right-header",
      minWidth: 120,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <CurrencyCell {...params} showZero={true} />,
    },
    {
      field: "difference2",
      headerName: "差額",
      minWidth: 120,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <CurrencyCell
          {...params}
          showZero={true}
          showNotZeroBackgroundColor={true}
        />
      ),
    },
  ];
};

export type { PropertyIncomeExpenseSummaryRow };