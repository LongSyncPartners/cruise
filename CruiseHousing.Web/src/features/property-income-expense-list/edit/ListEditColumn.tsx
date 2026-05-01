import CreateHeaderEditable from "@/features/shared/CreateHeaderEditable";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { ListEditRow } from "../types";
import DateCell from "@/features/shared/DateCell";
import MultilineCell from "@/features/shared/MultilineCell";
import CurrencyCell from "@/features/shared/CurrencyCell";
import { formatUSD, parseCurrencyInput } from "@/features/shared/utils";
import CurrencyEditCell from "@/features/shared/CurrencyEditCell";
import MultilineEditCell from "@/features/shared/MultilineEditCell";
import { createDateCellValidator } from "@/features/shared/gridValidators";
import { SubjectOption, TabOption } from "../subjectOptions";
import { LIST_EDIT_COLUMN_LABELS } from "./ListEditColumnLabels";
import { withContextMenu } from "@/features/shared/withContextMenu";
import { OptionItem } from "@/features/shared/types";

type CreateListEditColumnsParams = {
  onRenameHeader?: (field: string, headerName: string) => void;
  onCellContextMenu: (
    params: GridRenderCellParams<ListEditRow>,
    event: React.MouseEvent<HTMLElement>
  ) => void;
  detailTabs: TabOption[];
  subjectTabs: SubjectOption[];
  accountingSubjects? : OptionItem[];
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
  onCellContextMenu,
  detailTabs,
  subjectTabs,
  accountingSubjects
}: CreateListEditColumnsParams): GridColDef<ListEditRow>[] => {
  const renderEditableHeader = createEditableHeader(onRenameHeader);

  const addContextMenu = (col: GridColDef<ListEditRow>) =>
    withContextMenu(col, onCellContextMenu);

  return [
    addContextMenu({
      field: "transactionDate",
      headerName: LIST_EDIT_COLUMN_LABELS.transactionDate,
      headerClassName: "align-center-header",
      width: 110,
      editable: true,
      sortable: false,
      filterable: false,
      renderCell: (params) => <DateCell {...params} />,
    }),
    addContextMenu({
      field: "detailType",
      headerName: LIST_EDIT_COLUMN_LABELS.detailType,
      headerClassName: "align-center-header",
      width: 120,
      editable: true,
      sortable: false,
      filterable: false,
      type: "singleSelect",
      valueOptions: detailTabs,
    }),
    addContextMenu({
      field: "subject",
      headerName: LIST_EDIT_COLUMN_LABELS.subject,
      headerClassName: "align-left-header",
      width: 110,
      editable: true,
      sortable: false,
      filterable: false,
      type: "singleSelect",
      valueOptions: subjectTabs,
    }),
    addContextMenu({
      field: "amount",
      headerName: LIST_EDIT_COLUMN_LABELS.amount,
      headerClassName: "align-right-header",
      width: 100,
      editable: true,
      sortable: false,
      filterable: false,
      valueFormatter: (value) => formatUSD(value as number),
      valueParser: (value) => parseCurrencyInput(value),
      renderCell: (params) => <CurrencyCell {...params}  />,
      renderEditCell: (params) => <CurrencyEditCell {...params} />,
    }),
    addContextMenu({
      field: "masterAmount",
      headerName: LIST_EDIT_COLUMN_LABELS.masterAmount,
      headerClassName: "align-right-header",
      width: 100,
      editable: true,
      sortable: false,
      filterable: false,
      valueFormatter: (value) => formatUSD(value as number),
      valueParser: (value) => parseCurrencyInput(value),
      renderCell: (params) => <CurrencyCell {...params}  />,
      renderEditCell: (params) => <CurrencyEditCell {...params} />,
    }),
    addContextMenu({
      field: "accountingSubjectName",
      headerName: LIST_EDIT_COLUMN_LABELS.accountingSubjectName,
      headerClassName: "align-left-header",
      width: 130,
      editable: true,
      sortable: false,
      filterable: false,
      preProcessEditCellProps: createDateCellValidator({ required: true }),
      type: "singleSelect",
      valueOptions: accountingSubjects,
    }),
    addContextMenu({
      field: "appliedSubjectAux",
      headerName: LIST_EDIT_COLUMN_LABELS.appliedSubjectAux,
      headerClassName: "align-left-header",
      minWidth: 120,
      editable: true,
      sortable: false,
      filterable: false,
      renderCell: (params) => <MultilineCell {...params} />,
      renderEditCell: (params) => <MultilineEditCell {...params} />,
    }),
    addContextMenu({
      field: "debit",
      headerName: LIST_EDIT_COLUMN_LABELS.debit,
      headerClassName: "align-left-header",
      minWidth: 100,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <MultilineCell {...params} />,
      renderEditCell: (params) => <MultilineEditCell {...params} />,
    }),
    addContextMenu({
      field: "debitAux",
      headerName: LIST_EDIT_COLUMN_LABELS.debitAux,
      headerClassName: "align-left-header",
      minWidth: 100,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <MultilineCell {...params} />,
      renderEditCell: (params) => <MultilineEditCell {...params} />,
    }),
    addContextMenu({
      field: "credit",
      headerName: LIST_EDIT_COLUMN_LABELS.credit,
      headerClassName: "align-left-header",
      minWidth: 100,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <MultilineCell {...params} />,
      renderEditCell: (params) => <MultilineEditCell {...params} />,
    }),
    addContextMenu({
      field: "creditAux",
      headerName: LIST_EDIT_COLUMN_LABELS.creditAux,
      headerClassName: "align-left-header",
      minWidth: 100,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <MultilineCell {...params} />,
      renderEditCell: (params) => <MultilineEditCell {...params} />,
    }),
    addContextMenu({
      field: "uploadProcessedDate",
      headerName: LIST_EDIT_COLUMN_LABELS.uploadProcessedDate,
      headerClassName: "align-left-header",
      minWidth: 100,
      flex: 1,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <DateCell {...params} />,
    }),
  ];
};