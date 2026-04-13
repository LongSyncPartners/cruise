import { useCallback, useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import {
  DataGrid,
  GridRowSelectionModel,
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
import { getYearMonth, isSameMonth, parseCurrency } from "../shared/utils";
import { usePropertyIncomeExpenseCalculation } from "./usePropertyIncomeExpenseCalculation";
import { shouldRecalculateRow } from "./utils";

/**
 * Props for PropertyIncomeExpenseDetailGrid
 */
type PropertyIncomeExpenseDetailGridProps = {
  rows: PropertyIncomeExpenseDetailRow[];
  onRowsChange: (nextRows: PropertyIncomeExpenseDetailRow[]) => void;
  onDirtyChange?: () => void;
  onSelectedRowsChange?: (rows: PropertyIncomeExpenseDetailRow[]) => void;
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
  onSelectedRowsChange,
}: PropertyIncomeExpenseDetailGridProps) {
  // Sticky column styling (left fixed columns)
  const stickySx = createStickyColumnSx([80, 100, 110, 100]);

  // Grid states
  const [filterModel, setFilterModel] = useState<GridFilterModel>({ items: [] });
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [contextMenu, setContextMenu] = useState<CellContextMenuState>(null);
  const [copiedRows, setCopiedRows] = useState<PropertyIncomeExpenseDetailRow[]>([]);
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
  const handleDelete = (_menu: NonNullable<CellContextMenuState>) => {
    if (selectedRowIds.size === 0) return;

    const nextRows = rows.filter((row) => !selectedRowIds.has(row.id));

    onRowsChange(recalculateBalances(nextRows));
    onDirtyChange?.();
  };

  /**
   * Copy selected row to memory
   */
  const handleCopy = (_menu: NonNullable<CellContextMenuState>) => {
    if (selectedRowIds.size === 0) return;

    const nextCopiedRows = rows
      .filter((row) => selectedRowIds.has(row.id))
      .map((row) => ({ ...row }));

    setCopiedRows(nextCopiedRows);
  };

  /**
   * Paste first copied row into current row
   */
  const handlePaste = (_menu: NonNullable<CellContextMenuState>) => {
    if (copiedRows.length === 0 || selectedRowIds.size === 0) return;

    const firstCopiedRow = copiedRows[0];
    const firstSelectedId = rows.find((row) => selectedRowIds.has(row.id))?.id;

    if (!firstSelectedId) return;

    const nextRows = rows.map((row) =>
      row.id === firstSelectedId
        ? {
            ...firstCopiedRow,
            id: row.id,
          }
        : row
    );

    onRowsChange(recalculateBalances(nextRows));
    onDirtyChange?.();
    setCopiedRows([]);
  };

  /**
   * Paste copied row below current row
   */
  const handlePasteBelow = (_menu: NonNullable<CellContextMenuState>) => {
    if (copiedRows.length === 0 || selectedRowIds.size === 0) return;

    const firstSelectedIndex = rows.findIndex((row) => selectedRowIds.has(row.id));
    if (firstSelectedIndex < 0) return;

    const rowsToInsert = copiedRows.map((row) => ({
      ...row,
      id: uuidv4(),
    }));

    const nextRows = [...rows];
    nextRows.splice(firstSelectedIndex + 1, 0, ...rowsToInsert);

    onRowsChange(recalculateBalances(nextRows));
    onDirtyChange?.();
    setCopiedRows([]);
  };

  const handleToggleExecutedState = useCallback(
    (rowId: string | number) => {
      const nextRows = rows.map((row) =>
        row.id === rowId
          ? {
              ...row,
              executedState: !row.executedState,
            }
          : row
      );

      onRowsChange(nextRows);
      onDirtyChange?.();
    },
    [rows, onRowsChange, onDirtyChange]
  );

  /**
   * Columns definition (memoized)
   */
  const columns = useMemo(
    () =>
      createPropertyIncomeExpenseDetailColumns({
        onCellContextMenu: handleCellContextMenu,
        onToggleExecutedState: handleToggleExecutedState,
      }),
    [handleToggleExecutedState]
  );

  const [selectedRowIds, setSelectedRowIds] = useState<Set<string | number>>(
    new Set()
  );

  const handleRowClick = useCallback(
    (
      params: { id: string | number },
      event: React.MouseEvent
    ) => {
      setSelectedRowIds((prev) => {
        // 👉 Ctrl + click → multi select
        if (event.ctrlKey) {
          const next = new Set(prev);

          if (next.has(params.id)) {
            next.delete(params.id);
          } else {
            next.add(params.id);
          }

          return next;
        }

        // 👉 click thường → select 1 row duy nhất
        return new Set([params.id]);
      });
    },
    []
  );

  /**
   * Handle row update (cell editing)
   * - Parse currency values
   * - Recalculate balance from current row onward
   */
  const { updateRowAndRecalculate } = usePropertyIncomeExpenseCalculation();

  const processRowUpdate = useCallback(
  (updatedRow: GridRowModel<PropertyIncomeExpenseDetailRow>) => {
      const currentRow = rows.find((row) => row.id === updatedRow.id);

      if (!currentRow) {
        return updatedRow as PropertyIncomeExpenseDetailRow;
      }

      // If no calculation-related field changed,
      // just merge the edited row and return it.
      if (!shouldRecalculateRow(currentRow, updatedRow)) {
        const nextRows = rows.map((row) =>
          row.id === updatedRow.id
            ? {
                ...row,
                ...updatedRow,
              }
            : row
        );

        const returnedRow =
          nextRows.find((row) => row.id === updatedRow.id) ??
          (updatedRow as PropertyIncomeExpenseDetailRow);

        onRowsChange(nextRows);
        return returnedRow;
      }

      // Recalculate only when important fields changed
      const { nextRows, returnedRow } = updateRowAndRecalculate(rows, updatedRow);

      onRowsChange(nextRows);
      return returnedRow;
    },
    [onRowsChange, rows, updateRowAndRecalculate]
  );

  const handleSetSelectedRowsColor = useCallback(
    (_menu: NonNullable<CellContextMenuState>, color: string) => {
      const nextRows = rows.map((row) => {
        if (!selectedRowIds.has(row.id)) {
          return row;
        }

        return {
          ...row,
          rowColorType: color,
        };
      });

      onRowsChange(nextRows);
      onDirtyChange?.();
    },
    [rows, selectedRowIds, onRowsChange, onDirtyChange]
  );

  // sync selected rows to parent component
  useEffect(() => {
    const selectedRows = rows.filter((row) => selectedRowIds.has(row.id));
    onSelectedRowsChange?.(selectedRows);
  }, [rows, selectedRowIds, onSelectedRowsChange]);

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
        checkboxSelection={false}
        disableColumnMenu
        pageSizeOptions={[20]}
        disableRowSelectionOnClick={true}
        onRowClick={handleRowClick}
        getRowClassName={(params) => {
          switch (params.row.rowColorType) {
            case "gray":
              return "mui-row-color-gray";
            case "yellow":
              return "mui-row-color-yellow";
            case "blue":
              return "mui-row-color-blue";
            case "pink":
              return "mui-row-color-pink";
            default:
              if (selectedRowIds.has(params.id)) {
                return "mui-row-selected-custom";
              } else {
                return "";
              }
            }
        }}
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
        onSetSelectedRowsColor={handleSetSelectedRowsColor}
        canPaste={copiedRows.length > 0}
      />
    </Box>
  );
}