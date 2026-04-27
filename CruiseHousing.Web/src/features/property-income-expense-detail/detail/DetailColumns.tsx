import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import React from "react";

import MultilineEditCell from "../../shared/MultilineEditCell";
import { formatUSD, parseCurrencyInput } from "../../shared/utils";
import { type PropertyIncomeExpenseDetailRow } from "../types";
import {
  createDateCellValidator,
  createTextCellValidator,
} from "../../shared/gridValidators";
import CurrencyEditCell from "../../shared/CurrencyEditCell";
import CurrencyCell from "../../shared/CurrencyCell";
import MultilineCell from "../../shared/MultilineCell";
import DateCell from "../../shared/DateCell";
import DateEditCell from "../../shared/DateEditCell";
import YearMonthCell from "../../shared/YearMonthCell";
import CreateHeaderEditable from "../../shared/CreateHeaderEditable";
import { PROPERTY_INCOME_EXPENSE_DETAIL_COLUMN_LABELS } from "./DetailColumnLabels";

type CreateColumnsParams = {
  onCellContextMenu: (
    params: GridRenderCellParams<PropertyIncomeExpenseDetailRow>,
    event: React.MouseEvent<HTMLElement>
  ) => void;
  onToggleExecutedState: (rowId: string | number) => void;
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

export const createPropertyIncomeExpenseDetailColumns = ({
  onCellContextMenu,
  onToggleExecutedState,
  onRenameHeader,
}: CreateColumnsParams): GridColDef<PropertyIncomeExpenseDetailRow>[] => {
  const renderEditableHeader = createEditableHeader(onRenameHeader);

  const withContextMenu = (
    col: GridColDef<PropertyIncomeExpenseDetailRow>
  ): GridColDef<PropertyIncomeExpenseDetailRow> => {
    const originalRenderCell = col.renderCell;

    return {
      ...col,
      renderCell: (params) => (
        <div
          onContextMenu={(event) => onCellContextMenu(params, event)}
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          {originalRenderCell
            ? originalRenderCell(params)
            : params.formattedValue ?? params.value ?? ""}
        </div>
      ),
    };
  };

  return [
    withContextMenu({
      field: "yearMonth",
      headerName: PROPERTY_INCOME_EXPENSE_DETAIL_COLUMN_LABELS.yearMonth,
      headerClassName: "align-right-header",
      width: 80,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <YearMonthCell
          {...params}
          onToggleExecutedState={onToggleExecutedState}
        />
      ),
    }),
    withContextMenu({
      field: "expectedAmount",
      headerName: PROPERTY_INCOME_EXPENSE_DETAIL_COLUMN_LABELS.expectedAmount,
      headerClassName: "align-right-header",
      width: 100,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <CurrencyCell {...params} />,
    }),
    withContextMenu({
      field: "managementCompanyAmount",
      headerName:
        PROPERTY_INCOME_EXPENSE_DETAIL_COLUMN_LABELS.managementCompanyAmount,
      width: 120,
      editable: true,
      sortable: false,
      filterable: false,
      headerClassName: "line-separator align-right-header",
      cellClassName: "line-separator",
      valueFormatter: (value) => formatUSD(value as number),
      valueParser: (value) => parseCurrencyInput(value),
      renderCell: (params) => <CurrencyCell {...params} />,
      renderEditCell: (params) => <CurrencyEditCell {...params} />,
    }),
    withContextMenu({
      field: "transactionDate",
      headerName: PROPERTY_INCOME_EXPENSE_DETAIL_COLUMN_LABELS.transactionDate,
      width: 100,
      editable: true,
      sortable: false,
      filterable: false,
      renderCell: (params) => <DateCell {...params} />,
      preProcessEditCellProps: createDateCellValidator({ required: true }),
      renderEditCell: (params) => <DateEditCell {...params} required />,
    }),
    withContextMenu({
      field: "counterparty",
      headerName: PROPERTY_INCOME_EXPENSE_DETAIL_COLUMN_LABELS.counterparty,
      width: 150,
      editable: true,
      sortable: false,
      filterable: false,
      preProcessEditCellProps: createTextCellValidator({
        maxLength: 40,
        required: true,
      }),
      renderEditCell: (params) => (
        <MultilineEditCell {...params} maxLength={40} required />
      ),
    }),
    withContextMenu({
      field: "description",
      headerName: PROPERTY_INCOME_EXPENSE_DETAIL_COLUMN_LABELS.description,
      width: 250,
      editable: true,
      sortable: false,
      filterable: false,
      preProcessEditCellProps: createTextCellValidator({ required: true }),
      renderCell: (params) => <MultilineCell {...params} />,
      renderEditCell: (params) => <MultilineEditCell {...params} required />,
    }),
    withContextMenu({
      field: "income",
      headerName: PROPERTY_INCOME_EXPENSE_DETAIL_COLUMN_LABELS.income,
      headerClassName: "align-right-header",
      width: 100,
      editable: true,
      sortable: false,
      filterable: false,
      valueFormatter: (value) => formatUSD(value as number),
      valueParser: (value) => parseCurrencyInput(value),
      renderCell: (params) => <CurrencyCell {...params} />,
      renderEditCell: (params) => <CurrencyEditCell {...params} />,
    }),
    withContextMenu({
      field: "expense",
      headerName: PROPERTY_INCOME_EXPENSE_DETAIL_COLUMN_LABELS.expense,
      headerClassName: "align-right-header",
      width: 100,
      editable: true,
      sortable: false,
      filterable: false,
      valueFormatter: (value) => formatUSD(value as number),
      valueParser: (value) => parseCurrencyInput(value),
      renderCell: (params) => <CurrencyCell {...params} />,
      renderEditCell: (params) => <CurrencyEditCell {...params} />,
    }),
    withContextMenu({
      field: "balance",
      headerName: PROPERTY_INCOME_EXPENSE_DETAIL_COLUMN_LABELS.balance,
      headerClassName: "align-right-header",
      width: 120,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <CurrencyCell {...params} />,
    }),
    withContextMenu({
      field: "note",
      headerName: PROPERTY_INCOME_EXPENSE_DETAIL_COLUMN_LABELS.note,
      flex: 1,
      minWidth: 180,
      editable: true,
      sortable: false,
      filterable: false,
      preProcessEditCellProps: createTextCellValidator({}),
      renderCell: (params) => <MultilineCell {...params} />,
      renderEditCell: (params) => <MultilineEditCell {...params} />,
    }),
  ];
};