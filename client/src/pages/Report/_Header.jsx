import React from "react";
import logo from '../../assets/images/header_logo.png';
import { Box, Typography, Table, TableBody, TableRow, TableCell } from "@mui/material";

export default function ReportHeader({ header }) {
  return (
    <Box mb={1}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
        <Box display="flex">
            <Box className="report_header_line"> </Box>
            <Typography className="jp-text">{header.noteTop ?? ""}</Typography>
        </Box>
        
        <Box className="report-header-title">
            {header.titleBar}
        </Box>

         <Box>
            <img src={logo} alt="" className="header-logo-report" />
        </Box>
      </Box>



      {/* Box thông tin góc trái (giống trang 1) */}
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
        <Box className="jp-box" sx={{ width: "72mm" }}>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell className="report-table-cell ">収支合計（収入-支出）</TableCell>
                <TableCell className="report-table-cell" align="right">{header.summary.net}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="report-table-cell ">9月送金予定額</TableCell>
                <TableCell className="report-table-cell" align="right">{header.summary.nextPlan}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="report-table-cell ">物件管理No.</TableCell>
                <TableCell className="report-table-cell">{header.summary.propertyNo}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="report-table-cell ">物件住所</TableCell>
                <TableCell className="report-table-cell report-table-cell-wrap">{header.summary.address}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="report-table-cell ">管理開始日</TableCell>
                <TableCell className="report-table-cell">{header.summary.startDate}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>

        {/* khoảng trống phải (file có chữ viết tay/space) */}
        <Box sx={{ width: "1px", flex: 1 }} />
      </Box>
    </Box>
  );
}
