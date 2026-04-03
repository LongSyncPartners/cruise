import { useMemo, useState, useEffect } from "react";
import { AlertColor, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from "@mui/material";
import {
  DataGrid,
  useGridApiRef,
  type GridColDef,
  type GridRenderCellParams,
  type GridRowId,
  GridFilterModel,
  GridSortModel,
  GridCellParams,
  GridRowSelectionModel
} from "@mui/x-data-grid";

import CustomContextMenu, {
  CellContextMenuState,
} from "../shared/CustomContextMenu";


import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import RefreshIcon from "@mui/icons-material/Refresh";
import UndoIcon from "@mui/icons-material/Undo";
import LogoutIcon from "@mui/icons-material/Logout";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import FileUploadIcon from '@mui/icons-material/FileUpload';

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";

import {paggingdata} from  "./data.dump";
import { _isVisible } from "ag-grid-community";

import {type PropertyRow} from "./types"

import CustomPagination from "../shared/CustomPagination";

import MultilineEditCell from "../shared/MultilineEditCell";
import { dataGridCommonSx } from "../shared/dataGridCommonSx";
import { createFilterableHeader } from "../shared/createFilterableHeader";

import "./index.style.css";
import CsvUpload from "../shared/CsvUpload";
import { ScreenId } from "../shared/enum";
import LoadingDialog from "../shared/LoadingDialog";
import CommonToast from "../shared/CommonToast";
import { downloadCsvStub } from "../shared/csv";
import { MANAGEMENT_TYPE_OPTIONS, PROCESSING_STATUS_OPTIONS, PROPERTY_STATUS_OPTIONS, PROPERTY_TYPE_OPTIONS } from "./property";
import { createStickyColumnSx } from "../shared/stickColumn.styles";
import { getPreviousMonthLabel } from "../shared/utils";
import ProcessingStatusStateDialog from "./ProcessingStatusDialog";

function PropertyDataGrid() {
    const stickySx = createStickyColumnSx([100, 120, 120]);
    
    const [open, setOpen] = useState(false);

    const [rows, setRows] = useState<PropertyRow[]>(paggingdata);

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
        params: GridRenderCellParams<PropertyRow>,
        event: React.MouseEvent<HTMLElement>
    ) => {
        
        event.preventDefault();
        event.stopPropagation();

        setRowSelectionModel({
            type: "include",
            ids: new Set([params.id]),
        });

        setContextMenu({
            mouseX: event.clientX,
            mouseY: event.clientY - 25,
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
                id: crypto.randomUUID(),
                propertyCode: "",
                managementType: "",
                propertyType: "",
                managementCompany: "",
                managementStartDate: "",
                managementEndDate: "",
                managementDate: "",
                propertyStatus: "",
                ownerName: "",
                processingStatus: "",
            };

            const newRows = [...prev];
            newRows.splice(index + 1, 0, newRow);

            return newRows;
        });
    };

    const handleDelete = (menu: NonNullable<CellContextMenuState>) => {
        setRows((prev) => prev.filter((row) => row.id !== menu.rowId));
    };

    const [copiedRow, setCopiedRow] = useState<PropertyRow | null>(null);
    const handleCopy = (menu: NonNullable<CellContextMenuState>) => {
        setCopiedRow(menu.row as PropertyRow);
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
                id: crypto.randomUUID(),
            };

            const newRows = [...prev];
            newRows.splice(index + 1, 0, newRow);

            return newRows;
        });

        setCopiedRow(null);
    };
    
    useEffect(() => {
        if (!contextMenu) return;

        const handleGlobalContextMenu = (event: MouseEvent) => {
            event.preventDefault();
            setContextMenu(null);
        };

        window.addEventListener("contextmenu", handleGlobalContextMenu);

        return () => {
            window.removeEventListener("contextmenu", handleGlobalContextMenu);
        };
    }, [contextMenu]);

    const withContextMenu = (
        col: GridColDef<PropertyRow>
    ): GridColDef<PropertyRow> => ({
        ...col,
        renderCell: (params) => (
            <span
                onContextMenu={(event) => handleCellContextMenu(params, event)}
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                    }}
            >
                {params.formattedValue ?? params.value ?? ""}
            </span>
        ),
    });

    const columns = useMemo<GridColDef<PropertyRow>[]>(
        () => [
            withContextMenu({
                field: "propertyCode",
                headerName: "物件番号",
                width: 100,
                editable: true,
                sortable: false,
                filterable: false,
                renderHeader: renderFilterableHeader,
            }),
            withContextMenu({
                field: "managementType",
                headerName: "管理種別",
                width: 120,
                editable: true,
                sortable: false,
                filterable: false,
                type: "singleSelect",
                valueOptions: MANAGEMENT_TYPE_OPTIONS,
                renderHeader: renderFilterableHeader,
            }),
            withContextMenu({
                field: "propertyType",
                headerName: "建物種別",
                width: 120,
                editable: true,
                sortable: false,
                filterable: false,
                type: "singleSelect",
                valueOptions: PROPERTY_TYPE_OPTIONS,
                renderHeader: renderFilterableHeader,
            }),
            withContextMenu({
                field: "managementCompany",
                headerName: "管理会社",
                width: 180,
                editable: true,
                sortable: false,
                filterable: false,
                renderHeader: renderFilterableHeader,
            }),
            withContextMenu({
                field: "managementDate",
                headerName: "管理開始～終了日",
                width: 200,
                editable: true,
                sortable: false,
                filterable: false,
                renderHeader: renderFilterableHeader,
            }),
            withContextMenu({
                field: "propertyStatus",
                headerName: "物件ステータス",
                width: 150,
                editable: true,
                sortable: false,
                filterable: false,
                type: "singleSelect",
                valueOptions: PROPERTY_STATUS_OPTIONS ,
                renderHeader: renderFilterableHeader,
            }),
            withContextMenu({   
                field: "ownerName",
                headerName: "オーナー名",
                width: 180,
                editable: true,
                sortable: false,
                filterable: false,
                renderHeader: renderFilterableHeader,
            }),
            withContextMenu({
                field: "processingStatus",
                headerName:  `処理ステータス（${getPreviousMonthLabel()}）`,
                flex: 1,
                minWidth: 280,
                editable: true,
                sortable: false,
                filterable: false,
                type: "singleSelect",
                valueOptions: PROCESSING_STATUS_OPTIONS,
                renderHeader: renderFilterableHeader,
            }),
        ],
        [renderFilterableHeader]
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

    const [rowSelectionModel, setRowSelectionModel] =
        useState<GridRowSelectionModel>({
            type: "include",
            ids: new Set<GridRowId>(),
        });


    const [openProcessingStatusDialog, setOpenProcessingStatusDialog] = useState(false);

    const handleOpenProcessingStatusDialog = () => {
        setOpenProcessingStatusDialog(true);
    };

    const handleCloseProcessingStatusDialog = () => {
        setOpenProcessingStatusDialog(false);
    };

    return (
    <Box sx={{ width: "auto", height: 500}}>
        <DataGrid
            rows={rows}
            columns={columns}
            rowHeight={50}
            columnHeaderHeight={40}
            className="properties-grid"
            
            localeText={{ 
                noRowsLabel: "データがありません",
                noResultsOverlayLabel: "データがありません" }}
            initialState={{
                pagination: { paginationModel: { pageSize: 20, page: 0 } },
            }}

            disableColumnMenu
            pageSizeOptions={[20]}
            checkboxSelection={false}
            disableRowSelectionOnClick={false}
            rowSelectionModel={rowSelectionModel}
            onRowSelectionModelChange={(newSelection) => {
                setRowSelectionModel(newSelection);
            }}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            editMode="cell"
            apiRef={apiRef}

            filterModel={filterModel}
            onFilterModelChange={setFilterModel}
            sortModel={sortModel}
            onSortModelChange={setSortModel}
            processRowUpdate={(updatedRow) => {
                setRows((prev) =>
                        prev.map((row) => (row.id === updatedRow.id ? updatedRow : row))
                    );
                return updatedRow;
            }}
            onProcessRowUpdateError={(error) => {
                console.error(error);
            }}
            sx={[dataGridCommonSx]}
            slots={{
                footer: () => (
                    <CustomPagination
                        page={paginationModel.page}
                        pageSize={paginationModel.pageSize}
                        rowCount={rowCount}
                        totalCountLabel="総物件数"
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
            onOpenProcessingStatusDialog={handleOpenProcessingStatusDialog}
            onCopy={handleCopy}
            onPaste={handlePaste}
            onPasteBelow={handlePasteBelow}
            onAdd={handleAdd}
            onDelete={handleDelete}
            screenId={ScreenId.PROPERTY_LIST}
            canPaste={!!copiedRow}
        />

        <ProcessingStatusStateDialog
                open={openProcessingStatusDialog}
                onClose={handleCloseProcessingStatusDialog}
        />
    </Box>
    );
}

export default function Properties() {

    const [open, setOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    /**
     * Open dialog
     * ダイアログを開く
     */
    const handleOpen = () => {
        setOpen(true);
    };

    /**
     * Close dialog
     * ダイアログを閉じる
     */
    const handleClose = () => {
        setOpen(false);
    };

    /**
     * Submit upload
     * アップロード処理
     */
    const handleSubmit = () => {
        if (!file) return;

        console.log("upload file =", file);

        // TODO: call API here

        setOpen(false);
    };

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
        <div className="properties-container">
            <div className="properties-common-header">
                <div className="common-header-item" onClick={handleLoading}>
                    <RefreshIcon />
                    <Typography>最新情報を更新</Typography>
                </div>
                <div className="common-header-item">
                    <FileUploadIcon />
                    <Typography onClick={handleOpen}>CSV形式でアップロードする</Typography>
                </div>
                <div className="common-header-item" onClick={handleDownload}>
                    <SaveAltIcon />
                    <Typography>CSV形式でダウンロードする</Typography>
                </div>
                <div className="common-header-item-logout">
                <LogoutIcon />
                <Typography>ログアウト</Typography>
                </div>
            </div>

            <Typography sx={{fontSize : "150%", fontWeight : "500", paddingBottom : 2}}>
                物件一覧
            </Typography>

            <div className="properties-grid-contaniner">
                <PropertyDataGrid />
            </div>

            <div className="properties-footer">
                <Button variant="contained" color="success" onClick={handleUpdate} disabled={loading}>
                保存
                </Button>

                <Button variant="contained" color="warning" onClick={handleLoading}>
                キャンセル
                </Button>
            </div>

            {/* Dialog */}
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>CSV形式でアップロード</DialogTitle>

                <DialogContent>
                <Stack mt={1}>
                    <CsvUpload value={file} onChange={setFile} />
                </Stack>
                </DialogContent>

                <DialogActions>
                <Button onClick={handleClose}>キャンセル</Button>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={!file}
                >
                    アップロード
                </Button>
                </DialogActions>
            </Dialog>

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