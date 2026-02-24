import React from "react";
import { Box, Typography, Table, TableBody, TableRow, TableCell } from "@mui/material";

export default function Page2({ data }) {
  const { page2 } = data;

  return (
    <Box sx={{ paddingTop: "20mm"}}>
      <Box className="box-header" sx={{ display: "flex"}}>
        <Typography className="jp-text " mb={0.5}>
            2．お預かり残高および累計収支
        </Typography>

        <Typography className="jp-text " sx={{marginLeft:"auto"}}>
            【単位：USD】
        </Typography>
      </Box>
      
      <Box className="jp-box">
        <Table size="small" sx={{ tableLayout: "fixed" }}>
          <colgroup>
            <col style={{ width: "10mm" }}/>
            <col style={{ width: "30mm" }}/>
            <col style={{ width: "15mm" }}/>
            <col style={{ width: "17mm" }}/>
            <col style={{ width: "15mm" }}/>
            <col style={{ width: "15mm" }}/>
            <col style={{ width: "15mm" }}/>
            <col style={{ width: "15mm" }}/>
            <col style={{ width: "17mm" }}/>
            <col style={{ width: "15mm" }}/>
            <col style={{ width: "15mm" }}/>
            <col style={{ width: "15mm" }}/>
            <col style={{ width: "15mm" }}/>
            <col style={{ width: "15mm" }}/>
            <col style={{ width: "15mm" }}/>
            <col style={{ width: "15mm" }}/>
            <col style={{ width: "15mm" }}/>
          </colgroup>
          <TableBody>
            {/* Header months */}
            <TableRow>
              <TableCell className="report-table-cell " colSpan={2}>項目</TableCell>
              {page2.months.map((m) => (
                <TableCell key={m} className="report-table-cell " align="center">
                  {m}
                </TableCell>
              ))}
              <TableCell className="report-table-cell ">異計</TableCell>
              <TableCell className="report-table-cell " colSpan={2}>備考</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="report-table-cell " colSpan={2}>月初残高</TableCell>
              {page2.months.map((m) => (
                <TableCell key={m} className="report-table-cell " align="center">
                </TableCell>
              ))}
              <TableCell className="report-table-cell "></TableCell>
              <TableCell className="report-table-cell " colSpan={2}></TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="report-table-cell ">収入</TableCell>
              <TableCell className="report-table-cell "></TableCell>
              {page2.months.map((m) => (
                <TableCell key={m} className="report-table-cell " align="center">
                </TableCell>
              ))}
              <TableCell className="report-table-cell "></TableCell>
              <TableCell className="report-table-cell " colSpan={2}></TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="report-table-cell "></TableCell>
              <TableCell className="report-table-cell ">賃料</TableCell>
              {page2.months.map((m) => (
                <TableCell key={m} className="report-table-cell " align="center">
                </TableCell>
              ))}
              <TableCell className="report-table-cell "></TableCell>
              <TableCell className="report-table-cell " colSpan={2}></TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="report-table-cell "></TableCell>
              <TableCell className="report-table-cell ">その他収入</TableCell>
              {page2.months.map((m) => (
                <TableCell key={m} className="report-table-cell " align="center">
                </TableCell>
              ))}
              <TableCell className="report-table-cell "></TableCell>
              <TableCell className="report-table-cell " colSpan={2}></TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="report-table-cell ">支出</TableCell>
              <TableCell className="report-table-cell "></TableCell>
              {page2.months.map((m) => (
                <TableCell key={m} className="report-table-cell " align="center">
                </TableCell>
              ))}
              <TableCell className="report-table-cell "></TableCell>
              <TableCell className="report-table-cell " colSpan={2}></TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="report-table-cell "></TableCell>
              <TableCell className="report-table-cell ">管理料</TableCell>
              {page2.months.map((m) => (
                <TableCell key={m} className="report-table-cell " align="center">
                </TableCell>
              ))}
              <TableCell className="report-table-cell "></TableCell>
              <TableCell className="report-table-cell " colSpan={2}></TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="report-table-cell "></TableCell>
              <TableCell className="report-table-cell ">修繕費</TableCell>
              {page2.months.map((m) => (
                <TableCell key={m} className="report-table-cell " align="center">
                </TableCell>
              ))}
              <TableCell className="report-table-cell "></TableCell>
              <TableCell className="report-table-cell " colSpan={2}></TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="report-table-cell "></TableCell>
              <TableCell className="report-table-cell ">定額修繕積立</TableCell>
              {page2.months.map((m) => (
                <TableCell key={m} className="report-table-cell " align="center">
                </TableCell>
              ))}
              <TableCell className="report-table-cell "></TableCell>
              <TableCell className="report-table-cell " colSpan={2}></TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="report-table-cell "></TableCell>
              <TableCell className="report-table-cell ">固定資産税</TableCell>
              {page2.months.map((m) => (
                <TableCell key={m} className="report-table-cell " align="center">
                </TableCell>
              ))}
              <TableCell className="report-table-cell "></TableCell>
              <TableCell className="report-table-cell " colSpan={2}></TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="report-table-cell "></TableCell>
              <TableCell className="report-table-cell ">保険料</TableCell>
              {page2.months.map((m) => (
                <TableCell key={m} className="report-table-cell " align="center">
                </TableCell>
              ))}
              <TableCell className="report-table-cell "></TableCell>
              <TableCell className="report-table-cell " colSpan={2}></TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="report-table-cell "></TableCell>
              <TableCell className="report-table-cell ">HOA費(管理組合費)</TableCell>
              {page2.months.map((m) => (
                <TableCell key={m} className="report-table-cell " align="center">
                </TableCell>
              ))}
              <TableCell className="report-table-cell "></TableCell>
              <TableCell className="report-table-cell " colSpan={2}></TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="report-table-cell "></TableCell>
              <TableCell className="report-table-cell ">税務申告</TableCell>
              {page2.months.map((m) => (
                <TableCell key={m} className="report-table-cell " align="center">
                </TableCell>
              ))}
              <TableCell className="report-table-cell "></TableCell>
              <TableCell className="report-table-cell " colSpan={2}></TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="report-table-cell "></TableCell>
              <TableCell className="report-table-cell ">雑費</TableCell>
              {page2.months.map((m) => (
                <TableCell key={m} className="report-table-cell " align="center">
                </TableCell>
              ))}
              <TableCell className="report-table-cell "></TableCell>
              <TableCell className="report-table-cell " colSpan={2}></TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="report-table-cell "></TableCell>
              <TableCell className="report-table-cell ">手数料</TableCell>
              {page2.months.map((m) => (
                <TableCell key={m} className="report-table-cell " align="center">
                </TableCell>
              ))}
              <TableCell className="report-table-cell "></TableCell>
              <TableCell className="report-table-cell " colSpan={2}></TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="report-table-cell "></TableCell>
              <TableCell className="report-table-cell ">その他支出</TableCell>
              {page2.months.map((m) => (
                <TableCell key={m} className="report-table-cell " align="center">
                </TableCell>
              ))}
              <TableCell className="report-table-cell "></TableCell>
              <TableCell className="report-table-cell " colSpan={2}></TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="report-table-cell " colSpan={2}>オーナー様からのご入金</TableCell>
              {page2.months.map((m) => (
                <TableCell key={m} className="report-table-cell " align="center">
                </TableCell>
              ))}
              <TableCell className="report-table-cell "></TableCell>
              <TableCell className="report-table-cell " colSpan={2}></TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="report-table-cell " colSpan={2}>オーナー様からのご送金</TableCell>
              {page2.months.map((m) => (
                <TableCell key={m} className="report-table-cell " align="center">
                </TableCell>
              ))}
              <TableCell className="report-table-cell "></TableCell>
              <TableCell className="report-table-cell " colSpan={2}></TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="report-table-cell " colSpan={2}>その他入金</TableCell>
              {page2.months.map((m) => (
                <TableCell key={m} className="report-table-cell " align="center">
                </TableCell>
              ))}
              <TableCell className="report-table-cell "></TableCell>
              <TableCell className="report-table-cell " colSpan={2}></TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="report-table-cell " colSpan={2}>その他出金</TableCell>
              {page2.months.map((m) => (
                <TableCell key={m} className="report-table-cell " align="center">
                </TableCell>
              ))}
              <TableCell className="report-table-cell "></TableCell>
              <TableCell className="report-table-cell " colSpan={2}></TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="report-table-cell " colSpan={2}>月末残高</TableCell>
              {page2.months.map((m) => (
                <TableCell key={m} className="report-table-cell " align="center">
                  99,999.99
                </TableCell>
              ))}
              <TableCell className="report-table-cell "></TableCell>
              <TableCell className="report-table-cell " colSpan={2}></TableCell>
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
