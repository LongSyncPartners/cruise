import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ForecastSearch from "./ForecastSearch"
import ForecastDetail from "./ForecastDetail"
import "./Forecast.css";
import RefreshIcon from '@mui/icons-material/Refresh';
import UndoIcon from '@mui/icons-material/Undo';
import LogoutIcon from '@mui/icons-material/Logout';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { Typography } from "@mui/material";

function ForecastDataGrid() {
  const [open, setOpen] = useState(false);
  const columns = [
    { 
      field: 'customerId', 
      headerName: '顧客番号', 
      width: 190,
      editable: false,
      sortable: false,
      filterable: false,
    },
    {
      field: 'customerName',
      headerName: '顧客氏名',
      width: 120,
      editable: false,
      sortable: false,
      filterable: false,
    },
    {
      field: 'address',
      headerName: '住所',
      width: 260,
      editable: false,
      sortable: false,
      filterable: false,
    },
    {
      field: 'lastDeliveryDate',
      headerName: '前回配送日',
      width: 110,
      editable: false,
      sortable: false,
      filterable: false,
    },
    {
      field: 'forecastDate',
      headerName: '予測日',
      width: 140,
      editable: true,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <TextField
          size="small"
          fullWidth
          className="form-input"
          value={params.value || ""}
        />
      ),
    },
    {
      field: 'forecastIndicator',
      headerName: '予測指針',
      width: 100,
      editable: false,
      sortable: false,
      filterable: false,
    },
     {
      field: 'gasRunOutDate',
      headerName: 'ガス切日',
      width: 110,
      editable: false,
      sortable: false,
      filterable: false,
    },
    {
      field: 'detail',
      headerName: '',
      flex: 1, 
      minWidth: 60,
      editable: false,
      sortable: false,
      filterable: false,
      renderHeader: () => (
        <DriveFileRenameOutlineIcon />
      ),
      renderCell: (params) => (
        <span
          onClick={() => setOpen(true)}
          style={{ color: "#1976d2", textDecoration: "underline" }}
        >
          詳細
        </span>
      ),
    },
  ];

  const rows = [
    {id: 1, customerId: 'XXXXXXXXXXXXXXXXXXXX', customerName: 'XXXXXXXXXX', address: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', lastDeliveryDate: 'XXXXXXXXXX', forecastDate: '2026/01/30', forecastIndicator: 'XXXXXXX',  gasRunOutDate: 'XXXXXXXXXX',detail: '詳細' },
    {id: 2, customerId: 'XXXXXXXXXXXXXXXXXXXX', customerName: 'XXXXXXXXXX', address: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', lastDeliveryDate: 'XXXXXXXXXX', forecastDate: '2026/01/30', forecastIndicator: 'XXXXXXX',  gasRunOutDate: 'XXXXXXXXXX',detail: '詳細' },
    {id: 3, customerId: 'XXXXXXXXXXXXXXXXXXXX', customerName: 'XXXXXXXXXX', address: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', lastDeliveryDate: 'XXXXXXXXXX', forecastDate: '2026/01/30', forecastIndicator: 'XXXXXXX',  gasRunOutDate: 'XXXXXXXXXX',detail: '詳細' }
  ];

  return (
    <Box sx={{ width: 'auto', maxWidth: '1220px' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowHeight={50}
        headerHeight={50}
        columnHeaderHeight={40}
        className="Forecast-grid"
        localeText={{
          noRowsLabel: 'データがありません',
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        disableColumnMenu
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        hideFooter
      />

      <ForecastDetail
                open={open}
                onClose={() => setOpen(false)}
              />
    </Box>
  );
}

export default function Forecast() {
  const [open, setOpen] = useState(false);
  return (
    <div className="forecast-container">
      <div className="forecast-common-header">
          <div className="common-header-item"><RefreshIcon/><Typography>最新情報を更新</Typography></div>
          <div className="common-header-item"><UndoIcon/><Typography>前の画面へ戻る</Typography></div>
          <div className="common-header-item"><SaveAltIcon/><Typography>CSV形式でダウンロードする</Typography></div>
          <div className="common-header-item-logout"><LogoutIcon/><Typography>ログアウト</Typography></div>
        </div>

      <ForecastSearch />
      <div className="forecast-grid-contaniner">
          <ForecastDataGrid/>
      </div>
      <div className="forecast-footer">
          <Button
              variant="contained"
              color="success"
              className=""
          >
              保存
          </Button>

          <Button
              variant="contained"
              color="success"
              className=""
          >
              予測再計算
          </Button>
          
      </div>
    </div>
  );
}
