import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import "../print.css";
import  ReportPrintPage  from "../ReportPrintPage"
import { Box, Button, TextField, Typography } from "@mui/material";

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

  return (
    <div className="report-container">
      <div className="report-header-button">
        <Typography>サブリース帳票</Typography>
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
