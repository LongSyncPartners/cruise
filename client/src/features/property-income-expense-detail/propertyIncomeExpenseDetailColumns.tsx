import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import React from "react";

import MultilineEditCell from "../shared/MultilineEditCell";
import { formatUSD, parseCurrencyInput } from "../shared/utils";
import { type PropertyIncomeExpenseDetailRow } from "./types";
import { validate, validateMaxLength, validateRequired } from "../shared/validators";
import { createDateCellValidator, createTextCellValidator } from "../shared/gridValidators";
import CurrencyEditCell from "../shared/CurrencyEditCell";
import CurrencyCell from "../shared/CurrencyCell";
import MultilineCell from "../shared/MultilineCell";
import DateCell from "../shared/DateCell";
import DateEditCell from "../shared/DateEditCell";
import YearMonthCell from "../shared/YearMonthCell";

type CreateColumnsParams = {
  onCellContextMenu: (
    params: GridRenderCellParams<PropertyIncomeExpenseDetailRow>,
    event: React.MouseEvent<HTMLElement>
  ) => void;
  onToggleExecutedState: (rowId: string | number) => void;
};

export const createPropertyIncomeExpenseDetailColumns = ({
  onCellContextMenu,
  onToggleExecutedState,
}: CreateColumnsParams): GridColDef<PropertyIncomeExpenseDetailRow>[] => {
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
      width: 80,
      editable: false,
      sortable: false,
      filterable: false,
      headerClassName: "sticky-col sticky-col-0",
      cellClassName: "sticky-col sticky-col-0",
      renderCell: (params) => <YearMonthCell {...params} onToggleExecutedState={onToggleExecutedState}/>,
    }),
    withContextMenu({
      field: "expectedAmount",
      headerName: "本来入金額",
      width: 100,
      editable: false,
      sortable: false,
      filterable: false,
      headerClassName: "sticky-col sticky-col-1",
      cellClassName: "sticky-col sticky-col-1",
      renderCell: (params) => (<CurrencyCell {...params} />),
    }),
    withContextMenu({
      field: "managementCompanyAmount",
      headerName: "管理会社入金",
      width: 110,
      editable: true,
      sortable: false,
      filterable: false,
      headerClassName: "sticky-col sticky-col-2",
      cellClassName: "sticky-col sticky-col-2",
      valueFormatter: (value) => formatUSD(value as number),
      valueParser: (value) => parseCurrencyInput(value),
      renderCell: (params) => (<CurrencyCell {...params} />),
      renderEditCell: (params) => (<CurrencyEditCell {...params} />),
    }),
    withContextMenu({
      field: "transactionDate",
      headerName: "Date",
      width: 100,
      editable: true,
      sortable: false,
      filterable: false,
      headerClassName: "sticky-col sticky-col-3",
      cellClassName: "sticky-col sticky-col-3",
      renderCell: (params) => <DateCell {...params} />,
      preProcessEditCellProps: createDateCellValidator({required: true}),
      renderEditCell: (params) => <DateEditCell {...params} required />,
    }),
    withContextMenu({
      field: "counterparty",
      headerName: "Payee/Payer",
      width: 150,
      editable: true,
      sortable: false,
      filterable: false,
      preProcessEditCellProps: createTextCellValidator({maxLength: 40, required: true,}),
      renderEditCell: (params) => <MultilineEditCell {...params} maxLength={40} required={true} />,
    }),
    withContextMenu({
      field: "description",
      headerName: "Description",
      width: 250,
      editable: true,
      sortable: false,
      filterable: false,
      preProcessEditCellProps: createTextCellValidator({ required: true}),
      renderCell: (params) => ( <MultilineCell {...params} />),
      renderEditCell: (params) => <MultilineEditCell {...params} required={true} />,
    }),
    withContextMenu({
      field: "income",
      headerName: "Income",
      width: 100,
      editable: true,
      sortable: false,
      filterable: false,
      valueFormatter: (value) => formatUSD(value as number),
      valueParser: (value) => parseCurrencyInput(value),
      renderCell: (params) => (<CurrencyCell {...params} />),
      renderEditCell: (params) => (<CurrencyEditCell {...params} />),
    }),
    withContextMenu({
      field: "expense",
      headerName: "Expense",
      width: 100,
      editable: true,
      sortable: false,
      filterable: false,
      valueFormatter: (value) => formatUSD(value as number),
      valueParser: (value) => parseCurrencyInput(value),
      renderCell: (params) => (<CurrencyCell {...params} />),
      renderEditCell: (params) => (<CurrencyEditCell {...params} />),
    }),
    withContextMenu({
      field: "balance",
      headerName: "Balance",
      width: 100,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => (<CurrencyCell {...params} />),
    }),
    withContextMenu({
      field: "note",
      headerName: "備考",
      flex: 1,
      minWidth: 180,
      editable: true,
      sortable: false,
      filterable: false,
      preProcessEditCellProps: createTextCellValidator({required: true}),
      renderEditCell: (params) => <MultilineEditCell {...params} required={true} />,
    }),
  ];
};