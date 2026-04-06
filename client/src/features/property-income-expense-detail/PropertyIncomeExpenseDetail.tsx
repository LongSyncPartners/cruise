import { useMemo, useState, useEffect, useCallback } from "react";
import { AlertColor, Box, Button, TextField, Typography } from "@mui/material";
import {
  DataGrid,
  useGridApiRef,
  type GridColDef,
  type GridRenderCellParams,
  type GridRowId,
  GridFilterModel,
  GridSortModel,
  GridCellParams,
  GridRowModel
} from "@mui/x-data-grid";

import CustomContextMenu, {
  CellContextMenuState,
} from "../shared/CustomContextMenu";

import { formatUSD, parseCurrency, parseCurrencyInput } from "../shared/utils";

import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import RefreshIcon from "@mui/icons-material/Refresh";
import UndoIcon from "@mui/icons-material/Undo";
import LogoutIcon from "@mui/icons-material/Logout";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import FileUploadIcon from '@mui/icons-material/FileUpload';

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";

import {initialdata} from  "./data.dump";
import { _isVisible } from "ag-grid-community";

import {type PropertyIncomeExpenseDetailRow} from "./types"

import CustomPagination from "../shared/CustomPagination";

import MultilineEditCell from "../shared/MultilineEditCell";
import { dataGridCommonSx } from "../shared/dataGridCommonSx";
import { createFilterableHeader } from "../shared/createFilterableHeader";

import "./index.style.css";
import PropertyHeader from "./PropertyHeader";
import { createStickyColumnSx } from "../shared/stickColumn.styles";
import { calculateRunningBalance } from "./utils";
import { useParams } from "react-router-dom";
import CommonToast from "../shared/CommonToast";
import { downloadCsvStub } from "../shared/csv";
import LoadingDialog from "../shared/LoadingDialog";
import { usePropertySelectionStore } from "@/stores/propertySelectionStore";
import { v4 as uuidv4 } from "uuid";

function PropertyDataGrid() {
    const stickySx = createStickyColumnSx([80, 100, 110, 100]);
    
    const [open, setOpen] = useState(false);

    const [rows, setRows] = useState<PropertyIncomeExpenseDetailRow[]>(
        calculateRunningBalance(initialdata));

    const [filterModel, setFilterModel] = useState<GridFilterModel>({
        items: [],
      });
    
    const [sortModel, setSortModel] = useState<GridSortModel>([]);

    const renderFilterableHeader = useMemo(
        () =>
            createFilterableHeader({
            filterModel,
            setFilterModel,
            sortModel,
            setSortModel,
            debounceMs: 400,
            }),
        [filterModel, sortModel]
    );

    const [contextMenu, setContextMenu] =
        useState<CellContextMenuState>(null);

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
        setRows((prev) => {
            const index = prev.findIndex((r) => r.id === menu.rowId);

            const newRow = {
                id: uuidv4(),
                yearMonth: "",
                expectedAmount: 0,
                managementCompanyAmount: 0,
                transactionDate: "",
                counterparty: "",
                description: "",
                income: 0,
                expense: 0,
                balance: 0,
                note: "",
            };

            const newRows = [...prev];
            newRows.splice(index + 1, 0, newRow);

            return newRows;
        });
    };
    
    const handleDelete = (menu: NonNullable<CellContextMenuState>) => {
        setRows((prev) => prev.filter((row) => row.id !== menu.rowId));
    };

    const [copiedRow, setCopiedRow] = useState<PropertyIncomeExpenseDetailRow | null>(null);
    const handleCopy = (menu: NonNullable<CellContextMenuState>) => {
        setCopiedRow(menu.row as PropertyIncomeExpenseDetailRow);
    };
    
    const handlePaste = (menu: NonNullable<CellContextMenuState>) => {
        if (!copiedRow) return;

        setRows((prev) =>
            prev.map((row) =>
            row.id === menu.rowId
                ? {
                    ...copiedRow,
                    id: row.id,
                }
                : row
            )
        );

        setCopiedRow(null);
    };

    const handlePasteBelow = (menu: NonNullable<CellContextMenuState>) => {
        if (!copiedRow) return;

        setRows((prev) => {
            const index = prev.findIndex((r) => r.id === menu.rowId);

            const newRow = {
                ...copiedRow,
                id: uuidv4(),
            };

            const newRows = [...prev];
            newRows.splice(index + 1, 0, newRow);

            return newRows;
        });

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
                : (params.formattedValue ?? params.value ?? "")}
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
                renderEditCell: (params) => (
                    <MultilineEditCell
                        {...params}
                        minRows={2}
                        maxRows={5}
                    />
                ),
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
                renderEditCell: (params) => (
                    <MultilineEditCell
                        {...params}
                        minRows={2}
                        maxRows={5}
                    />
                ),
            }),
        ],
        [renderFilterableHeader]
    );

    const processRowUpdate = useCallback(
        (updatedRow: GridRowModel<PropertyIncomeExpenseDetailRow>) => {
            let returnedRow = updatedRow as PropertyIncomeExpenseDetailRow;

            setRows((prev) => {
            const index = prev.findIndex((row) => row.id === updatedRow.id);
            if (index < 0) return prev;

            const newRows = [...prev];

            newRows[index] = {
                ...newRows[index],
                ...updatedRow,
                income: parseCurrency(updatedRow.income),
                expense: parseCurrency(updatedRow.expense),
            };

            let running = index > 0 ? newRows[index - 1].balance : 0;

            for (let i = index; i < newRows.length; i++) {
                const income = Number(newRows[i].income ?? 0);
                const expense = Number(newRows[i].expense ?? 0);

                running += income - expense;

                newRows[i] = {
                ...newRows[i],
                balance: running,
                };
            }

            returnedRow = newRows[index];
            return newRows;
            });

            return returnedRow;
        },
        []
    );



    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 20,
    });

    const [rowCount, setRowCount] = useState(rows.length);

    const apiRef = useGridApiRef();
    useEffect(() => {
        setTimeout(() => {
            apiRef.current?.resetRowHeights();
        }, 0);
    }, []);

    return (
    <Box sx={{ width: "auto", height: 520}}>
        <DataGrid
            rows={rows}
            columns={columns}
            rowHeight={40}
            columnHeaderHeight={40}
            className="property-income-expense-detail-grid"
            
            localeText={{ 
                noRowsLabel: "データがありません",
                noResultsOverlayLabel: "データがありません" }}
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
                        rowCount={rowCount}
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

export default function PropertyIncomeExpenseDetail() {
    const propertyCode = usePropertySelectionStore(
        (state) => state.selectedPropertyCode
    );

    const [loading, setLoading] = useState(false);
    
    const handleUpdate = async () => {
        try {
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            showToast("保存しました。");
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

    const [toast, setToast] = useState<{
        open: boolean;
        message: string;
        severity: AlertColor;
    }>({
        open: false,
        message: "",
        severity: "success",
    });
    
    const showToast = (message: string, severity: AlertColor = "success") => {
        setToast({ open: true, message, severity });
    };

    const handleDownload = async () => {
        try {
            setLoading(true);

            await downloadCsvStub("data.csv");

            showToast("CSVをダウンロードしました。");
        } catch (e) {
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
            <div className="common-header-item-logout">
            <LogoutIcon />
            <Typography>ログアウト</Typography>
            </div>
        </div>

        <Typography sx={{fontSize : "150%", fontWeight : "500", paddingBottom : 2}}>
            物件収支明細
        </Typography>

        <PropertyHeader
            propertyCode={propertyCode as string}
            roomCode="101"
            managementType="一般管理"
            propertyType="一戸建て"
            managementCompany="XXXXXXXXXX"
            managementPeriod="2026-01-01 ～ 2026-12-31"
        />

        <div className="property-income-expense-detail-grid-contaniner">
            <PropertyDataGrid />
        </div>

        <div className="property-income-expense-detail-footer">
            <Button variant="contained" color="success" onClick={handleUpdate} disabled={loading}>
            保存
            </Button>

            <Button variant="contained" color="warning" onClick={handleLoading}>
            キャンセル
            </Button>
        </div>

        <LoadingDialog
            open={loading}
        />

        <CommonToast
            open={toast.open}
            message={toast.message}
            severity={toast.severity}
            onClose={() => setToast((prev) => ({ ...prev, open: false }))}
        />

        </div>
    );
}