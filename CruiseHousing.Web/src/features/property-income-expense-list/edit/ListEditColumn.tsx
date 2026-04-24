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
      headerClassName: "align-center-header",
      width: 110,
      editable: true,
      sortable: false,
      filterable: false,
      renderCell: (params) => <DateCell {...params} />,
      renderHeader: renderEditableHeader,
    },
    {
      field: "category",
      headerName: "分類",
      headerClassName: "align-center-header",
      width: 60,
      editable: true,
      sortable: false,
      filterable: false,
      renderCell: (params) => <MultilineCell {...params} />,
      renderHeader: renderEditableHeader,
    },
    {
      field: "subject",
      headerName: "科目",
      headerClassName: "align-left-header",
      width: 110,
      editable: true,
      sortable: false,
      filterable: false,
      renderCell: (params) => <MultilineCell {...params} />,
      renderHeader: renderEditableHeader,
    },
    {
      field: "amount",
      headerName: "金額",
      headerClassName: "align-right-header",
      width: 100,
      editable: true,
      sortable: false,
      filterable: false,
      renderCell: (params) => <CurrencyCell {...params} showZero />,
      renderHeader: renderEditableHeader,
    },
    {
      field: "masterAmount",
      headerName: "マスター金額",
      headerClassName: "align-right-header",
      width: 100,
      editable: true,
      sortable: false,
      filterable: false,
      renderCell: (params) => <CurrencyCell {...params} showZero />,
      renderHeader: renderEditableHeader,
    },
    {
      field: "accountingSubjectName",
      headerName: "会計データ科目名",
      headerClassName: "align-left-header",
      width: 120,
      editable: true,
      sortable: false,
      filterable: false,
      renderCell: (params) => <MultilineCell {...params} />,
      renderHeader: renderEditableHeader,
    },
    {
      field: "appliedSubjectAux",
      headerName: "適用欄科目補助",
      headerClassName: "align-left-header",
      minWidth: 160,
      flex: 1,
      editable: true,
      sortable: false,
      filterable: false,
      renderCell: (params) => <MultilineCell {...params} />,
      renderHeader: renderEditableHeader,
    },
    {
      field: "debit",
      headerName: "借方",
      headerClassName: "align-left-header",
      minWidth: 120,
      flex: 1,
      editable: true,
      sortable: false,
      filterable: false,
      renderCell: (params) => <MultilineCell {...params} />,
      renderHeader: renderEditableHeader,
    },
    {
      field: "debitAux",
      headerName: "借方補助",
      headerClassName: "align-left-header",
      minWidth: 120,
      flex: 1,
      editable: true,
      sortable: false,
      filterable: false,
      renderCell: (params) => <MultilineCell {...params} />,
      renderHeader: renderEditableHeader,
    },
    {
      field: "credit",
      headerName: "貸方",
      headerClassName: "align-left-header",
      minWidth: 120,
      flex: 1,
      editable: true,
      sortable: false,
      filterable: false,
      renderCell: (params) => <MultilineCell {...params} />,
      renderHeader: renderEditableHeader,
    },
    {
      field: "creditAux",
      headerName: "貸方補助",
      headerClassName: "align-left-header",
      minWidth: 120,
      flex: 1,
      editable: true,
      sortable: false,
      filterable: false,
      renderCell: (params) => <MultilineCell {...params} />,
      renderHeader: renderEditableHeader,
    },
  ];
};