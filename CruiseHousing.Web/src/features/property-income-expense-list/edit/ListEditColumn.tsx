import CreateHeaderEditable from "@/features/shared/CreateHeaderEditable";
import type { GridColDef } from "@mui/x-data-grid";
import { ListEditRow } from "../types";
import DateCell from "@/features/shared/DateCell";
import MultilineCell from "@/features/shared/MultilineCell";
import CurrencyCell from "@/features/shared/CurrencyCell";

type CreateListEditColumnsParams = {
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

export const createListEditColumns = ({
  onRenameHeader,
}: CreateListEditColumnsParams = {}): GridColDef<ListEditRow>[] => {
  const renderEditableHeader = createEditableHeader(onRenameHeader);

  return [
    {
      field: "transactionDate",
      headerName: "年月日",
      width: 110,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <DateCell {...params} />,
      renderHeader: renderEditableHeader,
    },
    {
      field: "category",
      headerName: "分類",
      minWidth: 120,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <MultilineCell {...params} />,
      renderHeader: renderEditableHeader,
    },
    {
      field: "subject",
      headerName: "科目",
      minWidth: 140,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <MultilineCell {...params} />,
      renderHeader: renderEditableHeader,
    },
    {
      field: "amount",
      headerName: "金額",
      headerClassName: "align-right-header",
      minWidth: 120,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <CurrencyCell {...params} showZero />,
      renderHeader: renderEditableHeader,
    },
    {
      field: "masterAmount",
      headerName: "ﾏｽﾀｰ金額",
      headerClassName: "align-right-header",
      minWidth: 120,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <CurrencyCell {...params} showZero />,
      renderHeader: renderEditableHeader,
    },
    {
      field: "accountingSubjectName",
      headerName: "会計データ科目名",
      minWidth: 160,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <MultilineCell {...params} />,
      renderHeader: renderEditableHeader,
    },
    {
      field: "appliedSubjectAux",
      headerName: "適用欄科目補助",
      minWidth: 160,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <MultilineCell {...params} />,
      renderHeader: renderEditableHeader,
    },
    {
      field: "debit",
      headerName: "借方",
      minWidth: 120,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <MultilineCell {...params} />,
      renderHeader: renderEditableHeader,
    },
    {
      field: "debitAux",
      headerName: "借方補助",
      minWidth: 120,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <MultilineCell {...params} />,
      renderHeader: renderEditableHeader,
    },
    {
      field: "credit",
      headerName: "貸方",
      minWidth: 120,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <MultilineCell {...params} />,
      renderHeader: renderEditableHeader,
    },
    {
      field: "creditAux",
      headerName: "貸方補助",
      minWidth: 120,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <MultilineCell {...params} />,
      renderHeader: renderEditableHeader,
    },
  ];
};