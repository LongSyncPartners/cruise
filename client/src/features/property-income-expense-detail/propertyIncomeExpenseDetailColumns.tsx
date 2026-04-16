import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import React from "react";

import MultilineEditCell from "../shared/MultilineEditCell";
import { formatUSD, parseCurrencyInput } from "../shared/utils";
import { type PropertyIncomeExpenseDetailRow } from "./types";
import { createDateCellValidator, createTextCellValidator } from "../shared/gridValidators";
import CurrencyEditCell from "../shared/CurrencyEditCell";
import CurrencyCell from "../shared/CurrencyCell";
import MultilineCell from "../shared/MultilineCell";
import DateCell from "../shared/DateCell";
import DateEditCell from "../shared/DateEditCell";
import YearMonthCell from "../shared/YearMonthCell";
import CreateHeaderEditable from "../shared/CreateHeaderEditable";

type CreateColumnsParams = {
  onCellContextMenu: (
    params: GridRenderCellParams<PropertyIncomeExpenseDetailRow>,
    event: React.MouseEvent<HTMLElement>
  ) => void;
  onToggleExecutedState: (rowId: string | number) => void;
  onRenameHeader?: (field: string, headerName: string) => void;
};

/**
 * Reusable header renderer
 */
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
      headerName: "年月",
      headerClassName: "align-right-header",
      width: 80,
      editable: false,
      sortable: false,
      filterable: false,
      renderHeader: renderEditableHeader,
      renderCell: (params) => (
        <YearMonthCell
          {...params}
          onToggleExecutedState={onToggleExecutedState}
        />
      ),
    }),
    withContextMenu({
      field: "expectedAmount",
      headerName: "本来入金額",
      headerClassName: "align-right-header",
      width: 100,
      editable: false,
      sortable: false,
      filterable: false,
      renderHeader: renderEditableHeader,
      renderCell: (params) => <CurrencyCell {...params} />,
    }),
    withContextMenu({
      field: "managementCompanyAmount",
      headerName: "管理会社入金",
      width: 120,
      editable: true,
      sortable: false,
      filterable: false,
      headerClassName: "line-separator align-right-header",
      cellClassName: "line-separator",
      renderHeader: renderEditableHeader,
      valueFormatter: (value) => formatUSD(value as number),
      valueParser: (value) => parseCurrencyInput(value),
      renderCell: (params) => <CurrencyCell {...params} />,
      renderEditCell: (params) => <CurrencyEditCell {...params} />,
    }),
    withContextMenu({
      field: "transactionDate",
      headerName: "Date",
      width: 100,
      editable: true,
      sortable: false,
      filterable: false,
      renderHeader: renderEditableHeader,
      renderCell: (params) => <DateCell {...params} />,
      preProcessEditCellProps: createDateCellValidator({ required: true }),
      renderEditCell: (params) => <DateEditCell {...params} required />,
    }),
    withContextMenu({
      field: "counterparty",
      headerName: "Payee/Payer",
      width: 150,
      editable: true,
      sortable: false,
      filterable: false,
      renderHeader: renderEditableHeader,
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
      headerName: "Description",
      width: 250,
      editable: true,
      sortable: false,
      filterable: false,
      renderHeader: renderEditableHeader,
      preProcessEditCellProps: createTextCellValidator({ required: true }),
      renderCell: (params) => <MultilineCell {...params} />,
      renderEditCell: (params) => <MultilineEditCell {...params} required />,
    }),
    withContextMenu({
      field: "income",
      headerName: "Income",
      headerClassName: "align-right-header",
      width: 100,
      editable: true,
      sortable: false,
      filterable: false,
      renderHeader: renderEditableHeader,
      valueFormatter: (value) => formatUSD(value as number),
      valueParser: (value) => parseCurrencyInput(value),
      renderCell: (params) => <CurrencyCell {...params} />,
      renderEditCell: (params) => <CurrencyEditCell {...params} />,
    }),
    withContextMenu({
      field: "expense",
      headerName: "Expense",
      headerClassName: "align-right-header",
      width: 100,
      editable: true,
      sortable: false,
      filterable: false,
      renderHeader: renderEditableHeader,
      valueFormatter: (value) => formatUSD(value as number),
      valueParser: (value) => parseCurrencyInput(value),
      renderCell: (params) => <CurrencyCell {...params} />,
      renderEditCell: (params) => <CurrencyEditCell {...params} />,
    }),
    withContextMenu({
      field: "balance",
      headerName: "Balance",
      headerClassName: "align-right-header",
      width: 120,
      editable: false,
      sortable: false,
      filterable: false,
      renderHeader: renderEditableHeader,
      renderCell: (params) => <CurrencyCell {...params} />,
    }),
    withContextMenu({
      field: "note",
      headerName: "備考",
      flex: 1,
      minWidth: 180,
      editable: true,
      sortable: false,
      filterable: false,
      renderHeader: renderEditableHeader,
      preProcessEditCellProps: createTextCellValidator({ required: true }),
      renderCell: (params) => <MultilineCell {...params} />,
      renderEditCell: (params) => <MultilineEditCell {...params} required />,
    }),
  ];
};