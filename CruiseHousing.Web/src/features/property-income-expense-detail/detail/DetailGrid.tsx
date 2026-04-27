import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
} from "../../shared/CustomContextMenu";
import CustomPagination from "../../shared/CustomPagination";
import { dataGridCommonSx } from "../../shared/dataGridCommonSx";
import { createStickyColumnSx } from "../../shared/stickColumn.styles";

import {
  createEmptyPropertyIncomeExpenseDetailRow,
  recalculateBalances,
} from "./DetailRowUtils";
import { createPropertyIncomeExpenseDetailColumns } from "./DetailColumns";
import { type PropertyIncomeExpenseDetailRow } from "../types";

import { v4 as uuidv4 } from "uuid";
import { usePropertyIncomeExpenseCalculation } from "./useDetailCalculation";
import { shouldRecalculateRow } from "../utils";
import { usePropertyIncomeExpenseDetailStore } from "@/stores/propertyIncomeExpenseDetailStore";

/**
 * Props for PropertyIncomeExpenseDetailGrid
 */
type PropertyIncomeExpenseDetailGridProps = {
  rows: PropertyIncomeExpenseDetailRow[];
  onRowsChange: (nextRows: PropertyIncomeExpenseDetailRow[]) => void;
  onDirtyChange?: () => void;
  onSelectedRowsChange?: (rows: PropertyIncomeExpenseDetailRow[]) => void;
  onSelectedRowChange?: (row: PropertyIncomeExpenseDetailRow) => void; 
  isScreenLoading: boolean;
  onOpenFloatPanelClick?: (menu: NonNullable<CellContextMenuState>) => void
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
  onSelectedRowChange,
  isScreenLoading,
  onOpenFloatPanelClick
}: PropertyIncomeExpenseDetailGridProps) {
  const stickySx = createStickyColumnSx([80, 100, 110, 100]);

  const [filterModel, setFilterModel] = useState<GridFilterModel>({ items: [] });
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [contextMenu, setContextMenu] = useState<CellContextMenuState>(null);
  const [copiedRows, setCopiedRows] = useState<PropertyIncomeExpenseDetailRow[]>([]);
  const [selectedRowIds, setSelectedRowIds] = useState<Set<string | number>>(
    new Set()
  );

  const PAGE_SIZE = 20;
  const [paginationModel, setPaginationModel] = useState(() => ({
    pageSize: PAGE_SIZE,
    page: Math.max(0, Math.ceil(rows.length / PAGE_SIZE) - 1),
  }));

  const [headerNames, setHeaderNames] = useState<Record<string, string>>({});

  const apiRef = useGridApiRef();

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

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

  const handleRenameHeader = useCallback((field: string, headerName: string) => {
    setHeaderNames((prev) => ({
      ...prev,
      [field]: headerName,
    }));
  }, []);

  const handleAdd = (
    menu: NonNullable<CellContextMenuState>,
    addRowCount: number
  ) => {
    onRowsChange(
      recalculateBalances(
        rows.flatMap((row) => {
          if (row.id !== menu.rowId) return [row];

          const newRows = Array.from({ length: addRowCount }, () =>
            createEmptyPropertyIncomeExpenseDetailRow(row.balance)
          );

          return [row, ...newRows];
        })
      )
    );
    onDirtyChange?.();
  };

  const handleDelete = (_menu: NonNullable<CellContextMenuState>) => {
    if (selectedRowIds.size === 0) return;

    const nextRows = rows.filter((row) => !selectedRowIds.has(row.id));

    onRowsChange(recalculateBalances(nextRows));
    onDirtyChange?.();
  };

  const handleCopy = (_menu: NonNullable<CellContextMenuState>) => {
    if (selectedRowIds.size === 0) return;

    const nextCopiedRows = rows
      .filter((row) => selectedRowIds.has(row.id))
      .map((row) => ({ ...row }));

    setCopiedRows(nextCopiedRows);
  };

  const setCopiedAll = usePropertyIncomeExpenseDetailStore(
    (state) => state.setRows
  );
  const handleCopyAll = () => {
    setCopiedAll(rows);
  };

  const copyAllRows = usePropertyIncomeExpenseDetailStore((state) => state.rows);
  const clearCopiedAll = usePropertyIncomeExpenseDetailStore(
    (state) => state.clearRows
  );

  const handlePaste = (_menu: NonNullable<CellContextMenuState>) => {
    if (copyAllRows.length > 0) {
      onRowsChange(copyAllRows);
      clearCopiedAll();
      onDirtyChange?.();
      return;
    }

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

  const handlePasteBelow = (_menu: NonNullable<CellContextMenuState>) => {
    if (copyAllRows.length > 0) {
      onRowsChange(copyAllRows);
      clearCopiedAll();
      onDirtyChange?.();
      return;
    }

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

  const baseColumns = useMemo(
    () =>
      createPropertyIncomeExpenseDetailColumns({
        onCellContextMenu: handleCellContextMenu,
        onToggleExecutedState: handleToggleExecutedState,
        onRenameHeader: handleRenameHeader,
      }),
    [handleToggleExecutedState, handleRenameHeader]
  );

  const columns = useMemo(() => {
    return baseColumns.map((col) => ({
      ...col,
      headerName: headerNames[col.field] ?? col.headerName,
    }));
  }, [baseColumns, headerNames]);

  const handleRowClick = useCallback(
    (params: { id: string | number, row: PropertyIncomeExpenseDetailRow  }, event: React.MouseEvent) => {

      onSelectedRowChange?.(params.row);

      setSelectedRowIds((prev) => {
        if (event.ctrlKey) {
          const next = new Set(prev);

          if (next.has(params.id)) {
            next.delete(params.id);
          } else {
            next.add(params.id);
          }

          return next;
        }

        return new Set([params.id]);
      });
    },
    [onSelectedRowChange]
  );

  const { updateRowAndRecalculate } = usePropertyIncomeExpenseCalculation();

  const processRowUpdate = useCallback(
    (updatedRow: GridRowModel<PropertyIncomeExpenseDetailRow>) => {
      const currentRow = rows.find((row) => row.id === updatedRow.id);

      if (!currentRow) {
        return updatedRow as PropertyIncomeExpenseDetailRow;
      }

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

      const { nextRows, returnedRow } = updateRowAndRecalculate(rows, updatedRow);

      onRowsChange(nextRows);
      onSelectedRowChange?.(returnedRow);
      return returnedRow;
    },
    [onRowsChange, onSelectedRowChange, rows, updateRowAndRecalculate]
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

  useEffect(() => {
    setTimeout(() => {
      apiRef.current?.resetRowHeights();
    }, 0);
  }, [apiRef, rows]);

  useEffect(() => {
    const selectedRows = rows.filter((row) => selectedRowIds.has(row.id));
    onSelectedRowsChange?.(selectedRows);
  }, [rows, selectedRowIds, onSelectedRowsChange]);

  const didInitScrollRef = useRef(false);
  useEffect(() => {
    if (didInitScrollRef.current) return;
    if (isScreenLoading) return;
    if (rows.length === 0) return;

    didInitScrollRef.current = true;

    const lastPage = Math.max(0, Math.ceil(rows.length / PAGE_SIZE) - 1);

    setPaginationModel({
      page: lastPage,
      pageSize: PAGE_SIZE,
    });

    setTimeout(() => {
      apiRef.current?.scrollToIndexes({
        rowIndex: rows.length - 1,
      });
    }, 0);
  }, [rows.length, isScreenLoading]);

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
        checkboxSelection={false}
        disableColumnMenu
        pageSizeOptions={[PAGE_SIZE]}
        disableRowSelectionOnClick
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
              return selectedRowIds.has(params.id) ? "mui-row-selected-custom" : "";
          }
        }}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        paginationModel={paginationModel}
        editMode="cell"
        apiRef={apiRef}
        getRowHeight={() => "auto"}
        filterModel={filterModel}
        onFilterModelChange={setFilterModel}
        sortModel={sortModel}
        onSortModelChange={setSortModel}
        processRowUpdate={processRowUpdate}
        onCellEditStart={onDirtyChange}
        sx={[dataGridCommonSx, stickySx]}
        slots={{
          footer: () => {
            return (
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
            );
          },
        }}
      />

      <CustomContextMenu
        contextMenu={contextMenu}
        onClose={handleCloseContextMenu}
        features={{
          copy: true,
          paste: true,
          pasteBelow: true,
          color: true,
          addRows: true,
          delete: true,
          copyAll: false,
          openFloatingPanel: true,
        }}
        onCopy={handleCopy}
        onCopyAll={handleCopyAll}
        onPaste={handlePaste}
        onPasteBelow={handlePasteBelow}
        onAdd={handleAdd}
        onDelete={handleDelete}
        onSetSelectedRowsColor={handleSetSelectedRowsColor}
        canPaste={copiedRows.length > 0 || copyAllRows.length > 0}
        onOpenFloatPanelClick={onOpenFloatPanelClick}
      />
    </Box>
  );
}