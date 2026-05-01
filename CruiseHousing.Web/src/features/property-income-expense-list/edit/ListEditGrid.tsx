import { Box } from "@mui/material";
import {
  DataGrid,
  useGridApiRef,
  type GridRenderCellParams,
  type GridRowModel,
} from "@mui/x-data-grid";
import { useCallback, useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { createListEditColumns } from "./ListEditColumn";
import { dataGridCommonSx } from "@/features/shared/dataGridCommonSx";
import CustomPagination from "@/features/shared/CustomPagination";
import CustomContextMenu, {
  type CellContextMenuState,
} from "@/features/shared/CustomContextMenu";

import { ListEditRow } from "../types";
import {
  DETAIL_TAB_VALUES,
  SubjectOption,
  TabOption,
} from "../subjectOptions";
import { usePropertyIncomeExpenseListStore } from "@/stores/usePropertyIncomeExpenseListStore";
import { OptionItem } from "@/features/shared/types";

type ListEditGridProps = {
  rows: ListEditRow[];
  onRowsChange: (nextRows: ListEditRow[]) => void;
  onDirtyChange?: () => void;
  onSelectedRowsChange?: (rows: ListEditRow[]) => void;
  onSelectedRowChange?: (row: ListEditRow) => void;
  detailTabs: TabOption[];
  detailTabValue: number;
  subjectTabs: SubjectOption[];
  subjectTabValue: string;
  accountingSubjects: OptionItem[];
  onOpenFloatPanelClick?: (menu: NonNullable<CellContextMenuState>) => void;
};

const PAGE_SIZE = 30;

const createEmptyListEditRow = (): ListEditRow => ({
  id: uuidv4(),
  transactionDate: "",
  detailType: 0,
  subject: "",
  amount: 0,
  masterAmount: 0,
  accountingSubjectName: "",
  appliedSubjectAux: "",
  debit: "",
  debitAux: "",
  credit: "",
  creditAux: "",
  uploadProcessedDate: ""
});

export default function ListEditGrid({
  rows,
  onRowsChange,
  onDirtyChange,
  onSelectedRowsChange,
  onSelectedRowChange,
  detailTabs,
  detailTabValue,
  subjectTabs,
  subjectTabValue,
  onOpenFloatPanelClick,
  accountingSubjects,
}: ListEditGridProps) {
  const apiRef = useGridApiRef();

  const [headerNames, setHeaderNames] = useState<Record<string, string>>({});
  const [contextMenu, setContextMenu] = useState<CellContextMenuState>(null);
  const [copiedRows, setCopiedRows] = useState<ListEditRow[]>([]);
  const [selectedRowIds, setSelectedRowIds] = useState<Set<string | number>>(
    new Set()
  );

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: PAGE_SIZE,
  });

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const handleCellContextMenu = (
    params: GridRenderCellParams<ListEditRow>,
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

  const filteredDetailTabs = useMemo(() => {
    if (detailTabValue === DETAIL_TAB_VALUES.ALL) {
      return detailTabs.filter((tab) => tab.value !== DETAIL_TAB_VALUES.ALL);
    }

    return detailTabs.filter((tab) => tab.value === detailTabValue);
  }, [detailTabs, detailTabValue]);

  const filteredSubjectTabs = useMemo(() => {

    if (!subjectTabValue || subjectTabValue === "all") {
      return subjectTabs.filter((tab) => tab.value !== "all");
    }

    return subjectTabs.filter((tab) => tab.value === subjectTabValue);
  }, [subjectTabs, subjectTabValue]);

  const baseColumns = useMemo(
    () =>
      createListEditColumns({
        onRenameHeader: handleRenameHeader,
        onCellContextMenu: handleCellContextMenu,
        detailTabs: filteredDetailTabs,
        subjectTabs: filteredSubjectTabs,
        accountingSubjects: accountingSubjects,
      }),
    [handleRenameHeader, filteredDetailTabs, filteredSubjectTabs]
  );

  const columns = useMemo(() => {
    return baseColumns.map((col) => ({
      ...col,
      headerName: headerNames[col.field] ?? col.headerName,
    }));
  }, [baseColumns, headerNames]);

  const handleRowClick = useCallback(
    (
      params: { id: string | number; row: ListEditRow },
      event: React.MouseEvent
    ) => {
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

  const handleAdd = (
    menu: NonNullable<CellContextMenuState>,
    addRowCount: number
  ) => {
    const nextRows = rows.flatMap((row) => {
      if (row.id !== menu.rowId) return [row];

      const newRows = Array.from({ length: addRowCount }, () =>
        createEmptyListEditRow()
      );

      return [row, ...newRows];
    });

    onRowsChange(nextRows);
    onDirtyChange?.();
  };

  const handleDelete = () => {
    if (selectedRowIds.size === 0) return;

    const nextRows = rows.filter((row) => !selectedRowIds.has(row.id));

    onRowsChange(nextRows);
    setSelectedRowIds(new Set());
    onDirtyChange?.();
  };

  const handleCopy = () => {
    if (selectedRowIds.size === 0) return;

    const nextCopiedRows = rows
      .filter((row) => selectedRowIds.has(row.id))
      .map((row) => ({ ...row }));

    setCopiedRows(nextCopiedRows);
  };

  const setCopiedAll = usePropertyIncomeExpenseListStore(
    (state) => state.setRows
  );
  const handleCopyAll = () => {
    setCopiedAll(rows);
  };

  const copyAllRows = usePropertyIncomeExpenseListStore((state) => state.rows);
  const clearCopiedAll = usePropertyIncomeExpenseListStore(
    (state) => state.clearRows
  );

  const handlePaste = () => {
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

    onRowsChange(nextRows);
    onDirtyChange?.();
    setCopiedRows([]);
  };

  const handlePasteBelow = () => {
    if (copiedRows.length === 0 || selectedRowIds.size === 0) return;

    const firstSelectedIndex = rows.findIndex((row) =>
      selectedRowIds.has(row.id)
    );

    if (firstSelectedIndex < 0) return;

    const rowsToInsert = copiedRows.map((row) => ({
      ...row,
      id: uuidv4(),
    }));

    const nextRows = [...rows];
    nextRows.splice(firstSelectedIndex + 1, 0, ...rowsToInsert);

    onRowsChange(nextRows);
    onDirtyChange?.();
    setCopiedRows([]);
  };

  const handlePasteAll = () => {
    if (copyAllRows.length > 0) {
      onRowsChange(copyAllRows);
      clearCopiedAll();
      onDirtyChange?.();
    }
  };

  const processRowUpdate = useCallback(
    (updatedRow: GridRowModel<ListEditRow>) => {
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
        (updatedRow as ListEditRow);

      onRowsChange(nextRows);
      onSelectedRowChange?.(returnedRow);

      return returnedRow;
    },
    [rows, onRowsChange, onSelectedRowChange]
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

  return (
    <Box sx={{ width: "auto", height: "calc(100vh - 300px)" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowHeight={30}
        columnHeaderHeight={30}
        localeText={{
          noRowsLabel: "データがありません",
          noResultsOverlayLabel: "データがありません",
        }}
        getRowHeight={() => "auto"}
        disableRowSelectionOnClick
        disableColumnMenu
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        pageSizeOptions={[PAGE_SIZE]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        onRowClick={handleRowClick}
        editMode="cell"
        apiRef={apiRef}
        processRowUpdate={processRowUpdate}
        onCellEditStart={onDirtyChange}
        sx={[dataGridCommonSx]}
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

      <CustomContextMenu
        contextMenu={contextMenu}
        onClose={handleCloseContextMenu}
        features={{
          copy: true,
          paste: true,
          pasteBelow: true,
          color: false,
          addRows: true,
          delete: true,
          copyAll: true,
          openFloatingPanel: true,
        }}
        onCopy={handleCopy}
        onCopyAll={handleCopyAll}
        onPaste={handlePaste}
        onPasteAll={handlePasteAll}
        onPasteBelow={handlePasteBelow}
        onAdd={handleAdd}
        onDelete={handleDelete}
        canPaste={copiedRows.length > 0}
        canPasteAll={copyAllRows.length > 0 && rows.length === 1 && rows[0].transactionDate !== ""}
        onOpenFloatPanelClick={onOpenFloatPanelClick}
      />
    </Box>
  );
}