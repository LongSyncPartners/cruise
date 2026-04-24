import CreateHeaderEditable from "@/features/shared/CreateHeaderEditable";
import type { GridColDef } from "@mui/x-data-grid";
import { ListEditRow, SubjectTabInfo } from "../types";
import DateCell from "@/features/shared/DateCell";
import MultilineCell from "@/features/shared/MultilineCell";
import CurrencyCell from "@/features/shared/CurrencyCell";
import { formatUSD, parseCurrencyInput } from "@/features/shared/utils";
import CurrencyEditCell from "@/features/shared/CurrencyEditCell";
import MultilineEditCell from "@/features/shared/MultilineEditCell";
import { createDateCellValidator } from "@/features/shared/gridValidators";
import { SubjectOption, TabOption } from "../subjectOptions";

type CreateListEditColumnsParams = {
  onRenameHeader?: (field: string, headerName: string) => void;
  detailTabs: TabOption[];
  subjectTabs: SubjectOption[];
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
  detailTabs,
  subjectTabs,
}: CreateListEditColumnsParams): GridColDef<ListEditRow>[] => {
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
    },
    {
      field: "detailType",
      headerName: "分類",
      headerClassName: "align-center-header",
      width: 120,
      editable: true,
      sortable: false,
      filterable: false,
      type: "singleSelect",
      valueOptions: detailTabs,
    },
    {
      field: "subject",
      headerName: "科目",
      headerClassName: "align-left-header",
      width: 110,
      editable: true,
      sortable: false,
      filterable: false,
      type: "singleSelect",
      valueOptions: subjectTabs,
    },
    {
      field: "amount",
      headerName: "金額",
      headerClassName: "align-right-header",
      width: 100,
      editable: true,
      sortable: false,
      filterable: false,
      valueFormatter: (value) => formatUSD(value as number),
      valueParser: (value) => parseCurrencyInput(value),
      renderCell: (params) => <CurrencyCell {...params} showZero />,
      renderEditCell: (params) => <CurrencyEditCell {...params} />,
    },
    {
      field: "masterAmount",
      headerName: "マスター金額",
      headerClassName: "align-right-header",
      width: 100,
      editable: true,
      sortable: false,
      filterable: false,
      valueFormatter: (value) => formatUSD(value as number),
      valueParser: (value) => parseCurrencyInput(value),
      renderCell: (params) => <CurrencyCell {...params} showZero />,
      renderEditCell: (params) => <CurrencyEditCell {...params} />,
    },
    {
      field: "accountingSubjectName",
      headerName: "会計データ科目名",
      headerClassName: "align-left-header",
      width: 130,
      editable: true,
      sortable: false,
      filterable: false,
      preProcessEditCellProps: createDateCellValidator({ required: true }),
      renderCell: (params) => <MultilineCell {...params} />,
      renderEditCell: (params) => <MultilineEditCell {...params} />,
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
      renderEditCell: (params) => <MultilineEditCell {...params} />,
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
      renderEditCell: (params) => <MultilineEditCell {...params} />,
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
      renderEditCell: (params) => <MultilineEditCell {...params} />,
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
      renderEditCell: (params) => <MultilineEditCell {...params} />,
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
      renderEditCell: (params) => <MultilineEditCell {...params} />,
    },
  ];
};