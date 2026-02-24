import React from "react";
import { Box, Typography, Table, TableBody, TableRow, TableCell } from "@mui/material";

export default function Page3({ data }) {
  const { page3 } = data;

  return (
    <Box>
      <Box className="box-header" sx={{ display: "flex"}}>
        <Typography className="jp-text " mb={0.5}>
            3．科目別明細
        </Typography>

        <Typography className="jp-text " sx={{marginLeft:"auto"}}>
            【単位：USD】
        </Typography>
      </Box>

      <Box className="jp-box">
        <Table size="small" sx={{ tableLayout: "fixed" }}>
          <colgroup>
          <col style={{ width: "40mm" }}/>
          <col style={{ width: "15mm" }}/>
          <col style={{ width: "45mm" }}/>
          <col style={{ width: "15mm" }}/>
          <col style={{ width: "15mm" }}/>
          <col style={{ width: "40mm" }}/>
          <col style={{ width: "15mm" }}/>
          <col style={{ width: "45mm" }}/>
          <col style={{ width: "15mm" }}/>
          <col style={{ width: "15mm" }}/>
        </colgroup>
          <TableBody>

            

            <TableRow>
              <TableCell className="report-table-cell ">科目</TableCell>
              <TableCell className="report-table-cell ">部屋番号</TableCell>
              <TableCell className="report-table-cell ">内容</TableCell>
              <TableCell className="report-table-cell " align="center">収入</TableCell>
              <TableCell className="report-table-cell " align="center">支出</TableCell>
              <TableCell className="report-table-cell ">科目</TableCell>
              <TableCell className="report-table-cell ">部屋番号</TableCell>
              <TableCell className="report-table-cell ">内容</TableCell>
              <TableCell className="report-table-cell " align="center">収入</TableCell>
              <TableCell className="report-table-cell " align="center">支出</TableCell>
            </TableRow>

            {Array.from({ length: 28 }).map((_, idx) => (
              <TableRow key={idx}>
                <TableCell className="report-table-cell ">賃料</TableCell>
                <TableCell className="report-table-cell ">XXX</TableCell>
                <TableCell className="report-table-cell "></TableCell>
                <TableCell className="report-table-cell " align="center">99,999.99</TableCell>
                <TableCell className="report-table-cell " align="center">99,999.99</TableCell>
                <TableCell className="report-table-cell "></TableCell>
                <TableCell className="report-table-cell "></TableCell>
                <TableCell className="report-table-cell "></TableCell>
                <TableCell className="report-table-cell " align="center">99,999.99</TableCell>
                <TableCell className="report-table-cell " align="center">99,999.99</TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell className="report-table-cell " colSpan={8} sx={{textAlign:"left"}}>２０２５年８月度合計</TableCell>
              <TableCell className="report-table-cell " align="center">99,999.99</TableCell>
              <TableCell className="report-table-cell " align="center">99,999.99</TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}

function fmt(v) {
  if (v === null || v === undefined || v === "") return "";
  const n = Number(v);
  if (Number.isNaN(n)) return String(v);
  return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
