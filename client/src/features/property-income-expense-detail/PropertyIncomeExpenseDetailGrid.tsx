import { useCallback, useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import {
  DataGrid,
  useGridApiRef,
  type GridFilterModel,
  type GridRenderCellParams,
  type GridRowModel,
  type GridSortModel,
} from "@mui/x-data-grid";

import CustomContextMenu, {
  type CellContextMenuState,
} from "../shared/CustomContextMenu";
import CustomPagination from "../shared/CustomPagination";
import { dataGridCommonSx } from "../shared/dataGridCommonSx";
import { createStickyColumnSx } from "../shared/stickColumn.styles";

import {
  createEmptyPropertyIncomeExpenseDetailRow,
  recalculateBalances,
} from "./propertyIncomeExpenseDetailRowUtils";
import { createPropertyIncomeExpenseDetailColumns } from "./propertyIncomeExpenseDetailColumns";
import { type PropertyIncomeExpenseDetailRow } from "./types";

import { v4 as uuidv4 } from "uuid";
import { parseCurrency } from "../shared/utils";

/**
 * Props for PropertyIncomeExpenseDetailGrid
 */
type PropertyIncomeExpenseDetailGridProps = {
  rows: PropertyIncomeExpenseDetailRow[];
  onRowsChange: (nextRows: PropertyIncomeExpenseDetailRow[]) => void;
  onDirtyChange?: () => void;
};

/**
 * DataGrid component for Property Income/Expense Detail
 *
 * Responsibilities:
 * - Render DataGrid
 * - Handle row editing
 * - Handle context menu actions (add, delete, copy, paste)
 * - Manage pagination, sorting, filtering
 */
export default function PropertyIncomeExpenseDetailGrid({
  rows,
  onRowsChange,
  onDirtyChange,
}: PropertyIncomeExpenseDetailGridProps) {
  // Sticky column styling (left fixed columns)
  const stickySx = createStickyColumnSx([80, 100, 110, 100]);

  // Grid states
  const [filterModel, setFilterModel] = useState<GridFilterModel>({ items: [] });
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [contextMenu, setContextMenu] = useState<CellContextMenuState>(null);
  const [copiedRow, setCopiedRow] = useState<PropertyIncomeExpenseDetailRow | null>(null);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 20 });

  // MUI DataGrid API reference
  const apiRef = useGridApiRef();

  /**
   * Reset row height when data changes
   * Needed when using dynamic row height (auto)
   */
  useEffect(() => {
    setTimeout(() => {
      apiRef.current?.resetRowHeights();
    }, 0);
  }, [apiRef, rows]);

  /**
   * Ensure pagination is always within valid range
   */
  useEffect(() => {
    const maxPage = Math.max(0, Math.ceil(rows.length / paginationModel.pageSize) - 1);
    if (paginationModel.page > maxPage) {
      setPaginationModel((prev) => ({ ...prev, page: maxPage }));
    }
  }, [paginationModel.page, paginationModel.pageSize, rows.length]);

  /**
   * Close context menu
   */
  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  /**
   * Handle right-click on cell
   * Show custom context menu
   */
  const handleCellContextMenu = (
    params: GridRenderCellParams<PropertyIncomeExpenseDetailRow>,
    event: React.MouseEvent<HTMLElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    setContextMenu({
      mouseX: event.clientX,
      mouseY: event.clientY - 30,
      rowId: params.id,
      field: params.field,
      row: params.row,
      value: params.value,
    });
  };

  /**
   * Add a new empty row below selected row
   */
  const handleAdd = (menu: NonNullable<CellContextMenuState>) => {
    onRowsChange(
      recalculateBalances(
        rows.flatMap((row) => {
          if (row.id !== menu.rowId) return [row];

          return [row, createEmptyPropertyIncomeExpenseDetailRow(row.balance)];
        })
      )
    );
  };

  /**
   * Delete selected row
   */
  const handleDelete = (menu: NonNullable<CellContextMenuState>) => {
    onRowsChange(recalculateBalances(rows.filter((row) => row.id !== menu.rowId)));
  };

  /**
   * Copy selected row to memory
   */
  const handleCopy = (menu: NonNullable<CellContextMenuState>) => {
    setCopiedRow(menu.row as PropertyIncomeExpenseDetailRow);
  };

  /**
   * Paste copied row into current row
   */
  const handlePaste = (menu: NonNullable<CellContextMenuState>) => {
    if (!copiedRow) return;

    onRowsChange(
      recalculateBalances(
        rows.map((row) =>
          row.id === menu.rowId
            ? {
                ...copiedRow,
                id: row.id, // keep current row id
              }
            : row
        )
      )
    );

    setCopiedRow(null);
  };

  /**
   * Paste copied row below current row
   */
  const handlePasteBelow = (menu: NonNullable<CellContextMenuState>) => {
    if (!copiedRow) return;

    const index = rows.findIndex((row) => row.id === menu.rowId);
    if (index < 0) return;

    const nextRows = [...rows];

    nextRows.splice(index + 1, 0, {
      ...copiedRow,
      id: uuidv4(), // new unique id
    });

    onRowsChange(recalculateBalances(nextRows));
    setCopiedRow(null);
  };

  /**
   * Columns definition (memoized)
   */
  const columns = useMemo(
    () =>
      createPropertyIncomeExpenseDetailColumns({
        onCellContextMenu: handleCellContextMenu,
      }),
    []
  );

  /**
   * Handle row update (cell editing)
   * - Parse currency values
   * - Recalculate balance from current row onward
   */
  const processRowUpdate = useCallback(
    (updatedRow: GridRowModel<PropertyIncomeExpenseDetailRow>) => {
      let returnedRow = updatedRow as PropertyIncomeExpenseDetailRow;

      const nextRows = [...rows];
      const index = nextRows.findIndex((row) => row.id === updatedRow.id);

      if (index < 0) {
        return returnedRow;
      }

      // Update row with parsed values
      nextRows[index] = {
        ...nextRows[index],
        ...updatedRow,
        income: parseCurrency(updatedRow.income),
        expense: parseCurrency(updatedRow.expense),
      };

      // Recalculate running balance from this row onward
      let running = index > 0 ? Number(nextRows[index - 1].balance ?? 0) : 0;

      for (let i = index; i < nextRows.length; i += 1) {
        const income = Number(nextRows[i].income ?? 0);
        const expense = Number(nextRows[i].expense ?? 0);

        running += income - expense;

        nextRows[i] = {
          ...nextRows[i],
          balance: running,
        };
      }

      returnedRow = nextRows[index];

      onRowsChange(nextRows);

      return returnedRow;
    },
    [onRowsChange, rows]
  );

  return (
    <Box sx={{ width: "auto", height: 520 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowHeight={50}
        columnHeaderHeight={40}
        className="property-income-expense-detail-grid"
        localeText={{
          noRowsLabel: "データがありません",
          noResultsOverlayLabel: "データがありません",
        }}
        initialState={{
          pagination: { paginationModel: { pageSize: 20, page: 0 } },
        }}
        disableColumnMenu
        pageSizeOptions={[20]}
        disableRowSelectionOnClick
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        editMode="cell"
        apiRef={apiRef}
        getRowHeight={() => "auto"}
        filterModel={filterModel}
        onFilterModelChange={setFilterModel}
        sortModel={sortModel}
        onSortModelChange={setSortModel}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={(error) => {
          console.error(error);
        }}
        onCellEditStart={onDirtyChange}
        sx={[dataGridCommonSx, stickySx]}
        slots={{
          footer: () => (
            <CustomPagination
              page={paginationModel.page}
              pageSize={paginationModel.pageSize}
              rowCount={rows.length}
              onPageChange={(newPage) =>
                setPaginationModel((prev) => ({
                  ...prev,
                  page: newPage,
                }))
              }
            />
          ),
        }}
      />

      {/* Context menu for row actions */}
      <CustomContextMenu
        contextMenu={contextMenu}
        onClose={handleCloseContextMenu}
        onCopy={handleCopy}
        onPaste={handlePaste}
        onPasteBelow={handlePasteBelow}
        onAdd={handleAdd}
        onDelete={handleDelete}
        canPaste={!!copiedRow}
      />
    </Box>
  );
}