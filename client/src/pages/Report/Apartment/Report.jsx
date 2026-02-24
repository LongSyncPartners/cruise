import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import "../print.css";
import  ReportPrintPage  from "./ReportPrintPage"
import { Box, Button, TextField, Typography, Popover } from "@mui/material";

import RefreshIcon from '@mui/icons-material/Refresh';
import UndoIcon from '@mui/icons-material/Undo';
import LogoutIcon from '@mui/icons-material/Logout';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AddCommentIcon from '@mui/icons-material/AddComment';

import  ColorPaletteGrid  from "../Common/ColorPaletteGrid";

export default function Page() {
  const ref = useRef();

  const handlePrint = useReactToPrint({
    contentRef: ref, // (v2+) hoặc content: () => ref.current tùy version bạn
    documentTitle: "report",
    pageStyle: `
      @page { size: A4 landscape; margin: 10mm; }
      @media print { .no-print { display:none !important; } }
    `,
  });

  const [showPalette, setShowPalette] = React.useState(false);

  return (
    <div className="report-container">
      <div className="print-common-header">
          <div className="common-header-item"><RefreshIcon/><Typography>最新情報を更新</Typography></div>
          <div className="common-header-item"><AddCommentIcon/><Typography>セルにコメントを付ける</Typography></div>
          <Box sx={{ position: "relative", display: "inline-block" }}>
          <div className="common-header-item" onClick={() => setShowPalette(v => !v)}><BorderColorIcon/><Typography>セルの背景に色を付ける</Typography></div>
          {showPalette && (
  <Box
    sx={{
      position: "absolute",
      top: "100%",     // ngay dưới
      left: 0,
      mt: 1,           // khoảng cách nhỏ
      zIndex: 1300,
      bgcolor: "background.paper",
      boxShadow: 3,
      borderRadius: 1,
      p: 1,
    }}
  >
    <ColorPaletteGrid
      columns={8}
    />
  </Box>
)}
          </Box>
          <div className="common-header-item-logout"><LogoutIcon/><Typography>ログアウト</Typography></div>
      </div>

      <div className="report-header-button">
        <Typography>アパート帳票</Typography>
        <Button
              className="report-footer-button"
              variant="contained"
              onClick={handlePrint} 
          >
              印刷実行
          </Button>
      </div>
        
      <div ref={ref}>
        <ReportPrintPage />
      </div>
      
    </div>
    
  );
}
