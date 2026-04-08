import { useMemo, useState, useEffect, useCallback, useRef } from "react";
import {
  AlertColor,
  Box,
  Button,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  useGridApiRef,
  type GridColDef,
  type GridRenderCellParams,
  type GridRowModel,
  type GridFilterModel,
  type GridSortModel,
} from "@mui/x-data-grid";

import CustomContextMenu, {
  CellContextMenuState,
} from "../shared/CustomContextMenu";
import { formatUSD, parseCurrency, parseCurrencyInput } from "../shared/utils";
import RefreshIcon from "@mui/icons-material/Refresh";
import LogoutIcon from "@mui/icons-material/Logout";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

import { initialPropertyTabs } from "./data.dump";
import {
  type PropertyHeaderProps,
  type PropertyIncomeExpenseDetailRow,
  type PropertyTabData,
} from "./types";

import CustomPagination from "../shared/CustomPagination";
import MultilineEditCell from "../shared/MultilineEditCell";
import { dataGridCommonSx } from "../shared/dataGridCommonSx";
import { createStickyColumnSx } from "../shared/stickColumn.styles";
import PropertyHeader from "./PropertyHeader";
import CommonToast from "../shared/CommonToast";
import { downloadCsvStub } from "../shared/csv";
import LoadingDialog from "../shared/LoadingDialog";
import { v4 as uuidv4 } from "uuid";

import "./index.style.css";
import { usePropertySelectionStore } from "@/stores/propertySelectionStore";

type PropertyDataGridProps = {
  rows: PropertyIncomeExpenseDetailRow[];
  onRowsChange: (nextRows: PropertyIncomeExpenseDetailRow[]) => void;
};

const recalculateBalances = (rows: PropertyIncomeExpenseDetailRow[]): PropertyIncomeExpenseDetailRow[] => {
  let running = 0;

  return rows.map((row) => {
    const income = Number(row.income ?? 0);
    const expense = Number(row.expense ?? 0);
    running += income - expense;

    return {
      ...row,
      balance: running,
    };
  });
};

function PropertyDataGrid({ rows, onRowsChange }: PropertyDataGridProps) {
  const stickySx = createStickyColumnSx([80, 100, 110, 100]);
  const [filterModel, setFilterModel] = useState<GridFilterModel>({ items: [] });
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [contextMenu, setContextMenu] = useState<CellContextMenuState>(null);
  const [copiedRow, setCopiedRow] = useState<PropertyIncomeExpenseDetailRow | null>(null);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 20 });

  const apiRef = useGridApiRef();

  useEffect(() => {
    setTimeout(() => {
      apiRef.current?.resetRowHeights();
    }, 0);
  }, [apiRef, rows]);

  useEffect(() => {
    const maxPage = Math.max(0, Math.ceil(rows.length / paginationModel.pageSize) - 1);
    if (paginationModel.page > maxPage) {
      setPaginationModel((prev) => ({ ...prev, page: maxPage }));
    }
  }, [paginationModel.page, paginationModel.pageSize, rows.length]);

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

  const handleAdd = (menu: NonNullable<CellContextMenuState>) => {
    onRowsChange(
      recalculateBalances(
        rows.flatMap((row) => {
          if (row.id !== menu.rowId) {
            return [row];
          }

          const newRow: PropertyIncomeExpenseDetailRow = {
            id: uuidv4(),
            yearMonth: "",
            expectedAmount: 0,
            managementCompanyAmount: 0,
            transactionDate: "",
            counterparty: "",
            description: "",
            income: 0,
            expense: 0,
            balance: row.balance,
            note: "",
          };

          return [row, newRow];
        })
      )
    );
  };

  const handleDelete = (menu: NonNullable<CellContextMenuState>) => {
    onRowsChange(recalculateBalances(rows.filter((row) => row.id !== menu.rowId)));
  };

  const handleCopy = (menu: NonNullable<CellContextMenuState>) => {
    setCopiedRow(menu.row as PropertyIncomeExpenseDetailRow);
  };

  const handlePaste = (menu: NonNullable<CellContextMenuState>) => {
    if (!copiedRow) {
      return;
    }

    onRowsChange(
      recalculateBalances(
        rows.map((row) =>
          row.id === menu.rowId
            ? {
                ...copiedRow,
                id: row.id,
              }
            : row
        )
      )
    );

    setCopiedRow(null);
  };

  const handlePasteBelow = (menu: NonNullable<CellContextMenuState>) => {
    if (!copiedRow) {
      return;
    }

    const index = rows.findIndex((row) => row.id === menu.rowId);
    if (index < 0) {
      return;
    }

    const nextRows = [...rows];
    nextRows.splice(index + 1, 0, {
      ...copiedRow,
      id: uuidv4(),
    });

    onRowsChange(recalculateBalances(nextRows));
    setCopiedRow(null);
  };

  const withContextMenu = (
    col: GridColDef<PropertyIncomeExpenseDetailRow>
  ): GridColDef<PropertyIncomeExpenseDetailRow> => {
    const originalRenderCell = col.renderCell;

    return {
      ...col,
      renderCell: (params) => (
        <div
          onContextMenu={(event) => handleCellContextMenu(params, event)}
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

  const columns = useMemo<GridColDef<PropertyIncomeExpenseDetailRow>[]>(
    () => [
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
    ],
    []
  );

  const processRowUpdate = useCallback(
    (updatedRow: GridRowModel<PropertyIncomeExpenseDetailRow>) => {
      let returnedRow = updatedRow as PropertyIncomeExpenseDetailRow;

      const nextRows = [...rows];
      const index = nextRows.findIndex((row) => row.id === updatedRow.id);
      if (index < 0) {
        return returnedRow;
      }

      nextRows[index] = {
        ...nextRows[index],
        ...updatedRow,
        income: parseCurrency(updatedRow.income),
        expense: parseCurrency(updatedRow.expense),
      };

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
        rowHeight={40}
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

const TabPanel = ({
  active,
  header,
  rows,
  onRowsChange,
}: {
  active: boolean;
  header: PropertyHeaderProps;
  rows: PropertyIncomeExpenseDetailRow[];
  onRowsChange: (nextRows: PropertyIncomeExpenseDetailRow[]) => void;
}) => {
  if (!active) {
    return null;
  }

  return (
    <>
      <PropertyHeader {...header} />
      <div className="property-income-expense-detail-grid-contaniner">
        <PropertyDataGrid rows={rows} onRowsChange={onRowsChange} />
      </div>
    </>
  );
};

export default function PropertyIncomeExpenseDetail() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [propertyTabs, setPropertyTabs] = useState<PropertyTabData[]>(initialPropertyTabs);
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const propertyCode = usePropertySelectionStore(
        (state) => state.selectedPropertyCode
  );

  const defaultTabIndex = propertyTabs.findIndex(
    (tab) => tab.header.propertyCode === propertyCode
  );

  useEffect(() => {
    if (!propertyCode) return;

    const index = propertyTabs.findIndex(
      (tab) => tab.header.propertyCode === propertyCode
    );

    if (index !== -1) {
      setActiveTab(index);
    }
  }, [propertyCode, propertyTabs]);

  const tabsRootRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
    const selectedTab = tabRefs.current[activeTab];
    const tabsRoot = tabsRootRef.current;

    const scroller = tabsRoot?.querySelector(".MuiTabs-scroller") as HTMLDivElement | null;
    const tabList = tabsRoot?.querySelector('[role="tablist"]') as HTMLDivElement | null;

    if (!selectedTab || !scroller || !tabList) return;

    const tabRect = selectedTab.getBoundingClientRect();
    const listRect = tabList.getBoundingClientRect();

    const tabLeftInScrollableContent =
      scroller.scrollLeft + (tabRect.left - listRect.left);

    const targetScrollLeft =
      tabLeftInScrollableContent + tabRect.width / 2 - scroller.clientWidth / 2;

    const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;

    scroller.scrollTo({
        left: Math.max(0, Math.min(targetScrollLeft, maxScrollLeft)),
        behavior: "smooth",
      });
    });

    return () => cancelAnimationFrame(id);
  }, [activeTab]);
  
  const activeProperty = propertyTabs[activeTab];

  const showToast = (message: string, severity: AlertColor = "success") => {
    setToast({ open: true, message, severity });
  };

  const updateActiveRows = (nextRows: PropertyIncomeExpenseDetailRow[]) => {
    setPropertyTabs((prev) =>
      prev.map((tab, index) =>
        index === activeTab
          ? {
              ...tab,
              rows: nextRows,
            }
          : tab
      )
    );
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      showToast(`${activeProperty.header.propertyCode} を保存しました。`);
    } finally {
      setLoading(false);
    }
  };

  const handleLoading = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      setLoading(true);
      await downloadCsvStub(`${activeProperty.header.propertyCode}.csv`);
      showToast("CSVをダウンロードしました。");
    } catch (_error) {
      showToast("ダウンロードに失敗しました。", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="property-income-expense-detail-container">
      <div className="property-income-expense-detail-common-header">
        <div className="common-header-item" onClick={handleLoading}>
          <RefreshIcon />
          <Typography>最新情報を更新</Typography>
        </div>
        <div className="common-header-item" onClick={handleDownload}>
          <SaveAltIcon />
          <Typography>エクセルでダウンロードする</Typography>
        </div>
      </div>

      <Typography sx={{ fontSize: "150%", fontWeight: "500", paddingBottom: 2 }}>
        物件収支明細
      </Typography>

      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          mb: 2,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box sx={{ px: 0, whiteSpace: "nowrap", flexShrink: 0 }}>
          物件グループ：C
        </Box>

        <Tabs
          ref={tabsRootRef}
          value={activeTab}
          onChange={(_event, newValue: number) => setActiveTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          aria-label="Property income expense tabs"
          sx={{ minHeight: 48, flex: 1 }}
        >
          {propertyTabs.map((propertyTab, index) => (
            <Tab
              key={propertyTab.id}
              ref={(el) => {tabRefs.current[index] = el; }}
              label={`${propertyTab.header.propertyCode}`}
              sx={{ 
                  textTransform: "none",
                  whiteSpace: "nowrap",
                  minWidth: 60, 
                  maxWidth: 80,
                  px: 1,
                  "&.Mui-selected": {
                      backgroundColor: "#1976d2",
                      color: "white",
                  }
              }}
              disableRipple
            />
          ))}
        </Tabs>
      </Box>

      {propertyTabs.map((propertyTab, index) => (
        <TabPanel
          key={propertyTab.id}
          active={index === activeTab}
          header={propertyTab.header}
          rows={propertyTab.rows}
          onRowsChange={updateActiveRows}
        />
      ))}

      <div className="property-income-expense-detail-footer">
        <Button variant="contained" color="success" onClick={handleUpdate} disabled={loading}>
          保存
        </Button>

        <Button variant="contained" color="warning" onClick={handleLoading} disabled={loading}>
          キャンセル
        </Button>
      </div>

      <LoadingDialog open={loading} />

      <CommonToast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
}
