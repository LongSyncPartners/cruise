import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import React from "react";

import MultilineEditCell from "../shared/MultilineEditCell";
import { formatUSD, parseCurrencyInput } from "../shared/utils";
import { type PropertyIncomeExpenseDetailRow } from "./types";

type CreateColumnsParams = {
  onCellContextMenu: (
    params: GridRenderCellParams<PropertyIncomeExpenseDetailRow>,
    event: React.MouseEvent<HTMLElement>
  ) => void;
};

export const createPropertyIncomeExpenseDetailColumns = ({
  onCellContextMenu,
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
      editable: true,
      sortable: false,
      filterable: false,
      headerClassName: "sticky-col sticky-col-0",
      cellClassName: "sticky-col sticky-col-0",
    }),
    withContextMenu({
      field: "expectedAmount",
      headerName: "本来入金額",
      width: 100,
      editable: true,
      sortable: false,
      filterable: false,
      headerClassName: "sticky-col sticky-col-1",
      cellClassName: "sticky-col sticky-col-1",
      valueFormatter: (value) => formatUSD(value as number),
      renderCell: (params) => {
        const expectedAmount = Number(params.row.expectedAmount ?? 0);
        return (
          <span style={{ color: expectedAmount < 0 ? "red" : "inherit" }}>
            {formatUSD(expectedAmount)}
          </span>
        );
      },
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
    }),
    withContextMenu({
      field: "counterparty",
      headerName: "Payee/Payer",
      width: 150,
      editable: true,
      sortable: false,
      filterable: false,
    }),
    withContextMenu({
      field: "description",
      headerName: "Description",
      width: 250,
      editable: true,
      sortable: false,
      filterable: false,
      renderEditCell: (params) => <MultilineEditCell {...params} minRows={2} maxRows={5} />,
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
    }),
    withContextMenu({
      field: "balance",
      headerName: "Balance",
      width: 100,
      editable: false,
      sortable: false,
      filterable: false,
      valueFormatter: (value) => formatUSD(value as number),
      renderCell: (params) => {
        const balance = Number(params.row.balance ?? 0);
        return (
          <span style={{ color: balance < 0 ? "red" : "inherit" }}>
            {formatUSD(balance)}
          </span>
        );
      },
    }),
    withContextMenu({
      field: "note",
      headerName: "備考",
      flex: 1,
      minWidth: 180,
      editable: true,
      sortable: false,
      filterable: false,
      renderEditCell: (params) => <MultilineEditCell {...params} minRows={2} maxRows={5} />,
    }),
  ];
};