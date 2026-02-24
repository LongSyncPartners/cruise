import React from "react";
import { usePaintStore } from "./Common/PaintStore";
import { Box, Typography, Table, TableBody, TableRow, TableCell } from "@mui/material";
import ReportHeader from "./_Header";
import { DataGrid } from "@mui/x-data-grid";

export default function Page1({ data }) {
  const { header, page1 } = data;

  // get color from store
  const paintColor = usePaintStore((s) => s.paintColor);
  const clearPaint = usePaintStore((s) => s.clearPaint);
  const onCellClick = (params, event) => {
    if (!paintColor) return;

    // default click event of mui
    event.defaultMuiPrevented = true;
    
    // event set row of grid
    setRows((prev) =>
      prev.map((r) => {
        if (r.id !== params.id) return r;
        const nextCellColors = { ...(r.cellColors || {}) };
        nextCellColors[params.field] = paintColor;
        const newRow = { ...r, cellColors: nextCellColors };

        // update set clear color
        clearPaint();
        return newRow;
      })
    );
  };

  // evnet render cell of grid
  const renderPaintCell = (params) => {
    const bg = params.row.cellColors?.[params.field] || "";
    return (
      <Box sx={{ width: "100%", height: "100%", display: "flex", alignItems: "center", px: 1, bgcolor: bg || "transparent" }}>
        {params.formattedValue ?? params.value}
      </Box>
    );
  };

  // mui datagrid, whern focus out cell, update value to state grid
  const processRowUpdate = React.useCallback((newRow, oldRow) => {
    setRows((prev) => prev.map((r) => (r.id === newRow.id ? newRow : r)));
    return newRow; // rất quan trọng: trả về newRow để DataGrid dùng tiếp
  }, []);

    const [rows, setRows] = React.useState([
          { id:1, room:"101", rentIncome:99999.99, otherIncome:99999.99, incomeSub:99999.99, managementFee:99999.99, repairCost:99999.99, reserveFund:99999.99, propertyTax:99999.99, insuranceFee:99999.99, hoaFee:99999.99, taxReport:99999.99, misc:99999.99, serviceFee: 99999.99, otherExpenses:99999.99, expenseSubtotal:99999.99, totalExpenses:99999.99, cellColors: {} },
          { id:2, room:"102", rentIncome:0, otherIncome:0, incomeSub:0, managementFee:0, repairCost:0, reserveFund:0, propertyTax:0, insuranceFee:0, hoaFee:0, taxReport:0, misc:0, serviceFee: 0, otherExpenses:0, expenseSubtotal:0, totalExpenses:0, cellColors: {}, cellComments: "チェック" },
          { id:3, room:"103", rentIncome:99999.99, otherIncome:99999.99, incomeSub:99999.99, managementFee:99999.99, repairCost:99999.99, reserveFund:99999.99, propertyTax:99999.99, insuranceFee:99999.99, hoaFee:99999.99, taxReport:99999.99, misc:99999.99, serviceFee: 99999.99, otherExpenses:99999.99, expenseSubtotal:99999.99, totalExpenses:99999.99, cellColors: {} },
          { id:4, room:"104", rentIncome:0, otherIncome:0, incomeSub:0, managementFee:0, repairCost:0, reserveFund:0, propertyTax:0, insuranceFee:0, hoaFee:0, taxReport:0, misc:0, serviceFee: 0, otherExpenses:0, expenseSubtotal:0, totalExpenses:0, cellColors: {} },
          { id:5, room:"201", rentIncome:99999.99, otherIncome:99999.99, incomeSub:99999.99, managementFee:99999.99, repairCost:99999.99, reserveFund:99999.99, propertyTax:99999.99, insuranceFee:99999.99, hoaFee:99999.99, taxReport:99999.99, misc:99999.99, serviceFee: 99999.99, otherExpenses:99999.99, expenseSubtotal:99999.99, totalExpenses:99999.99, cellColors: {} },
          { id:6, room:"202", rentIncome:0, otherIncome:0, incomeSub:0, managementFee:0, repairCost:0, reserveFund:0, propertyTax:0, insuranceFee:0, hoaFee:0, taxReport:0, misc:0, serviceFee: 0, otherExpenses:0, expenseSubtotal:0, totalExpenses:0, cellColors: {} },
          { id:7, room:"203", rentIncome:99999.99, otherIncome:99999.99, incomeSub:99999.99, managementFee:99999.99, repairCost:99999.99, reserveFund:99999.99, propertyTax:99999.99, insuranceFee:99999.99, hoaFee:99999.99, taxReport:99999.99, misc:99999.99, serviceFee: 99999.99, otherExpenses:99999.99, expenseSubtotal:99999.99, totalExpenses:99999.99, cellColors: {} },
          { id:8, room:"204", rentIncome:0, otherIncome:0, incomeSub:0, managementFee:0, repairCost:0, reserveFund:0, propertyTax:0, insuranceFee:0, hoaFee:0, taxReport:0, misc:0, serviceFee: 0, otherExpenses:0, expenseSubtotal:0, totalExpenses:0, cellColors: {} },
          { id:9, room:"205", rentIncome:99999.99, otherIncome:99999.99, incomeSub:99999.99, managementFee:99999.99, repairCost:99999.99, reserveFund:99999.99, propertyTax:99999.99, insuranceFee:99999.99, hoaFee:99999.99, taxReport:99999.99, misc:99999.99, serviceFee: 99999.99, otherExpenses:99999.99, expenseSubtotal:99999.99, totalExpenses:99999.99, cellColors: {} },
          { id:10, room:"206", rentIncome:0, otherIncome:0, incomeSub:0, managementFee:0, repairCost:0, reserveFund:0, propertyTax:0, insuranceFee:0, hoaFee:0, taxReport:0, misc:0, serviceFee: 0, otherExpenses:0, expenseSubtotal:0, totalExpenses:0, cellColors: {} },
          { id:11, room:"207", rentIncome:99999.99, otherIncome:99999.99, incomeSub:99999.99, managementFee:99999.99, repairCost:99999.99, reserveFund:99999.99, propertyTax:99999.99, insuranceFee:99999.99, hoaFee:99999.99, taxReport:99999.99, misc:99999.99, serviceFee: 99999.99, otherExpenses:99999.99, expenseSubtotal:99999.99, totalExpenses:99999.99, cellColors: {} },
          { id:12, room:"301", rentIncome:0, otherIncome:0, incomeSub:0, managementFee:0, repairCost:0, reserveFund:0, propertyTax:0, insuranceFee:0, hoaFee:0, taxReport:0, misc:0, serviceFee: 0, otherExpenses:0, expenseSubtotal:0, totalExpenses:0, cellColors: {} },
          { id:13, room:"302", rentIncome:99999.99, otherIncome:99999.99, incomeSub:99999.99, managementFee:99999.99, repairCost:99999.99, reserveFund:99999.99, propertyTax:99999.99, insuranceFee:99999.99, hoaFee:99999.99, taxReport:99999.99, misc:99999.99, serviceFee: 99999.99, otherExpenses:99999.99, expenseSubtotal:99999.99, totalExpenses:99999.99, cellColors: {} },
          { id:14, room:"303", rentIncome:0, otherIncome:0, incomeSub:0, managementFee:0, repairCost:0, reserveFund:0, propertyTax:0, insuranceFee:0, hoaFee:0, taxReport:0, misc:0, serviceFee: 0, otherExpenses:0, expenseSubtotal:0, totalExpenses:0, cellColors: {} },
          { id:15, room:"304", rentIncome:99999.99, otherIncome:99999.99, incomeSub:99999.99, managementFee:99999.99, repairCost:99999.99, reserveFund:99999.99, propertyTax:99999.99, insuranceFee:99999.99, hoaFee:99999.99, taxReport:99999.99, misc:99999.99, serviceFee: 99999.99, otherExpenses:99999.99, expenseSubtotal:99999.99, totalExpenses:99999.99, cellColors: {} },
          { id:16, room:"305", rentIncome:0, otherIncome:0, incomeSub:0, managementFee:0, repairCost:0, reserveFund:0, propertyTax:0, insuranceFee:0, hoaFee:0, taxReport:0, misc:0, serviceFee: 0, otherExpenses:0, expenseSubtotal:0, totalExpenses:0, cellColors: {} },
          { id:17, room:"306", rentIncome:99999.99, otherIncome:99999.99, incomeSub:99999.99, managementFee:99999.99, repairCost:99999.99, reserveFund:99999.99, propertyTax:99999.99, insuranceFee:99999.99, hoaFee:99999.99, taxReport:99999.99, misc:99999.99, serviceFee: 99999.99, otherExpenses:99999.99, expenseSubtotal:99999.99, totalExpenses:99999.99, cellColors: {} },
          { id:18, room:"共通部",  rentIncome:0, otherIncome:0, incomeSub:0, managementFee:0, repairCost:0, reserveFund:0, propertyTax:0, insuranceFee:0, hoaFee:0, taxReport:0, misc:0, serviceFee: 0, otherExpenses:0, expenseSubtotal:0, totalExpenses:0, cellColors: {}  }
    ]);

    const columns = React.useMemo(
      () => [
        { field: "room", cellClassName:"reprot-grid-cell reprot-grid-cell-border-left-bold has-comment", width: 151, renderCell: renderPaintCell },
        { field: "rentIncome", width: 57, editable: true, cellClassName:"reprot-grid-cell reprot-grid-cell-border-left-bold", type: "number" ,  renderCell: renderPaintCell},
        { field: "otherIncome", width: 64, editable: true, cellClassName:"reprot-grid-cell", type: "number", renderCell: renderPaintCell },
        { field: "incomeSub", width: 57, editable: true, cellClassName:"reprot-grid-cell", type: "number", renderCell: renderPaintCell },
        { field: "managementFee", width: 57, editable: true, cellClassName:"reprot-grid-cell reprot-grid-cell-border-left-bold", type: "number", renderCell: renderPaintCell },
        { field: "repairCost", width: 57, editable: true, cellClassName:"reprot-grid-cell ", type: "number", renderCell: renderPaintCell },
        { field: "reserveFund", width: 57, editable: true, cellClassName:"reprot-grid-cell", type: "number", renderCell: renderPaintCell },
        { field: "propertyTax", width: 64, editable: true, cellClassName:"reprot-grid-cell", type: "number", renderCell: renderPaintCell },
        { field: "insuranceFee", width: 57, editable: true, cellClassName:"reprot-grid-cell", type: "number", renderCell: renderPaintCell },
        { field: "hoaFee", width: 57, editable: true, cellClassName:"reprot-grid-cell", type: "number", renderCell: renderPaintCell },
        { field: "taxReport", width: 57, editable: true, cellClassName:"reprot-grid-cell", type: "number", renderCell: renderPaintCell },
        { field: "misc", width: 57, editable: true, cellClassName:"reprot-grid-cell", type: "number", renderCell: renderPaintCell },
        { field: "serviceFee", width: 57, editable: true, cellClassName:"reprot-grid-cell", type: "number", renderCell: renderPaintCell },
        { field: "otherExpenses", width: 57, editable: true, cellClassName:"reprot-grid-cell", type: "number", renderCell: renderPaintCell },
        { field: "expenseSubtotal", width: 57, editable: true, cellClassName:"reprot-grid-cell reprot-grid-cell-border-left-bold", type: "number", renderCell: renderPaintCell },
        { field: "totalExpenses", width: 57, editable: false, cellClassName:"reprot-grid-cell reprot-grid-cell-border-left-bold", type: "number", renderCell: renderPaintCell },
      ],
      []
    );
    
  return (
    <Box >
      <ReportHeader header={header} />

      <Box className="box-header" sx={{ display: "flex"}}>
          <Typography className="jp-text " mb={0.5}>
              1．月次収入・支出
          </Typography>
  
          <Typography className="jp-text " sx={{marginLeft:"auto"}}>
              【単位：USD】
          </Typography>
      </Box>

      <Box className="">
        <Table size="small" sx={{ tableLayout: "fixed" }}>
          <colgroup>
            <col style={{ width: "151px" }}/>
            <col style={{ width: "57px" }}/>
            <col style={{ width: "64px" }}/>
            <col style={{ width: "57px" }}/>
            <col style={{ width: "57px" }}/>
            <col style={{ width: "57px" }}/>
            <col style={{ width: "57px" }}/>
            <col style={{ width: "64px" }}/>
            <col style={{ width: "57px" }}/>
            <col style={{ width: "57px" }}/>
            <col style={{ width: "57px" }}/>
            <col style={{ width: "57px" }}/>
            <col style={{ width: "57px" }}/>
            <col style={{ width: "57px" }}/>
            <col style={{ width: "57px" }}/>
            <col style={{ width: "57px" }}/>
          </colgroup>
          <TableBody>
            {/* Header row ( 部屋番号 + 収入 + 支出) */}
            <TableRow>
              <TableCell className="report-table-cell" rowSpan={2}>部屋番号</TableCell>
              <TableCell className="report-table-cell" colSpan={3} align="center">収入</TableCell>
              <TableCell className="report-table-cell" colSpan={11} align="center">支出</TableCell>
              <TableCell className="report-table-cell" rowSpan={2} >支出合計</TableCell>
            </TableRow>

            {/* Sub headers */}
            <TableRow>
              <TableCell className="report-table-cell " >賃料</TableCell>
              <TableCell className="report-table-cell ">その他収入</TableCell>
              <TableCell className="report-table-cell ">収入小計</TableCell>
              <TableCell className="report-table-cell ">管理料</TableCell>
              <TableCell className="report-table-cell ">修繕費</TableCell>
              <TableCell className="report-table-cell ">定額修繕積立</TableCell>
              <TableCell className="report-table-cell ">固定資産税</TableCell>
              <TableCell className="report-table-cell ">保険料</TableCell>
              <TableCell className="report-table-cell "><span>HOA費(管理組合費)</span></TableCell>
              <TableCell className="report-table-cell ">税務申告</TableCell>
              <TableCell className="report-table-cell ">雑費</TableCell>
              <TableCell className="report-table-cell " >手数料</TableCell>
              <TableCell className="report-table-cell ">その他支出</TableCell>
              <TableCell className="report-table-cell ">支出小計</TableCell>
            </TableRow>

            {/* Total row “合計（物件収支）” 
            <TableRow>
              <TableCell className="report-table-cell " >合計（物件収支）</TableCell>
              <TableCell className="report-table-cell " align="right">{fmt(page1.totalRow?.rentIncome)}</TableCell>
              <TableCell className="report-table-cell " align="right">{fmt(page1.totalRow?.otherIncome)}</TableCell>
              <TableCell className="report-table-cell " align="right">{fmt(page1.totalRow?.incomeSub)}</TableCell>
              <TableCell className="report-table-cell " align="right">{fmt(page1.totalRow?.managementFee)}</TableCell>
              <TableCell className="report-table-cell " align="right">{fmt(page1.totalRow?.repairCost)}</TableCell>
              <TableCell className="report-table-cell " align="right">{fmt(page1.totalRow?.reserveFund)}</TableCell>
              <TableCell className="report-table-cell " align="right">{fmt(page1.totalRow?.propertyTax)}</TableCell>
              <TableCell className="report-table-cell " align="right">{fmt(page1.totalRow?.insuranceFee)}</TableCell>
              <TableCell className="report-table-cell " align="right">{fmt(page1.totalRow?.hoaFee)}</TableCell>
              <TableCell className="report-table-cell " align="right">{fmt(page1.totalRow?.taxReport)}</TableCell>
              <TableCell className="report-table-cell " align="right">{fmt(page1.totalRow?.misc)}</TableCell>
              <TableCell className="report-table-cell " align="right">{fmt(page1.totalRow?.serviceFee)}</TableCell>
              <TableCell className="report-table-cell " align="right">{fmt(page1.totalRow?.otherExpenses)}</TableCell>
              <TableCell className="report-table-cell " align="right">{fmt(page1.totalRow?.expenseSubtotal)}</TableCell>
              <TableCell className="report-table-cell " align="right">{fmt(page1.totalRow?.totalExpenses)}</TableCell>
            </TableRow>
            */}
          </TableBody>
        </Table>

        <Box
          tabIndex={0}
          sx={{
            height : 460,
            border : "none",
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
            hideFooter
            rowHeight={20}
            isCellEditable={(params) =>
              params.row.id !== 19
            }
            sx={{
              border : "none",
                "& .MuiDataGrid-cell": {
                borderBottom: "1px solid #000",
                borderLeft: "1px solid #000",
                borderTop: "none",
                borderRight: "none"
              },
                "& .MuiDataGrid-columnHeaders": {
                display: "none"
              },
                "& .MuiDataGrid-row": {
                borderRight: "1px solid #000",
              },
              overflow:"hidden",
            }}
             onCellClick={onCellClick}
             processRowUpdate={processRowUpdate}
             slotProps={{
                cell: (params) => {
                  const c = params.row.cellComments?.[params.field];
                  return c ? { title: c } : {};
                },
              }}
              cellClassName={"has-comment"}
          />
          {/*
          <Table>
          <colgroup>
            <col style={{ width: "151px" }}/>
            <col style={{ width: "57px" }}/>
            <col style={{ width: "64px" }}/>
            <col style={{ width: "57px" }}/>
            <col style={{ width: "57px" }}/>
            <col style={{ width: "57px" }}/>
            <col style={{ width: "57px" }}/>
            <col style={{ width: "64px" }}/>
            <col style={{ width: "57px" }}/>
            <col style={{ width: "57px" }}/>
            <col style={{ width: "57px" }}/>
            <col style={{ width: "57px" }}/>
            <col style={{ width: "57px" }}/>
            <col style={{ width: "57px" }}/>
            <col style={{ width: "57px" }}/>
            <col style={{ width: "57px" }}/>
          </colgroup>
          <TableBody>
            <TableRow>
              <TableCell className="report-table-cell " >合計（物件収支）</TableCell>
              <TableCell className="report-table-cell " align="right">{fmt(page1.totalRow?.rentIncome)}</TableCell>
              <TableCell className="report-table-cell " align="right">{fmt(page1.totalRow?.otherIncome)}</TableCell>
              <TableCell className="report-table-cell " align="right">{fmt(page1.totalRow?.incomeSub)}</TableCell>
              <TableCell className="report-table-cell " align="right">{fmt(page1.totalRow?.managementFee)}</TableCell>
              <TableCell className="report-table-cell " align="right">{fmt(page1.totalRow?.repairCost)}</TableCell>
              <TableCell className="report-table-cell " align="right">{fmt(page1.totalRow?.reserveFund)}</TableCell>
              <TableCell className="report-table-cell " align="right">{fmt(page1.totalRow?.propertyTax)}</TableCell>
              <TableCell className="report-table-cell " align="right">{fmt(page1.totalRow?.insuranceFee)}</TableCell>
              <TableCell className="report-table-cell " align="right">{fmt(page1.totalRow?.hoaFee)}</TableCell>
              <TableCell className="report-table-cell " align="right">{fmt(page1.totalRow?.taxReport)}</TableCell>
              <TableCell className="report-table-cell " align="right">{fmt(page1.totalRow?.misc)}</TableCell>
              <TableCell className="report-table-cell " align="right">{fmt(page1.totalRow?.serviceFee)}</TableCell>
              <TableCell className="report-table-cell " align="right">{fmt(page1.totalRow?.otherExpenses)}</TableCell>
              <TableCell className="report-table-cell " align="right">{fmt(page1.totalRow?.expenseSubtotal)}</TableCell>
              <TableCell className="report-table-cell " align="right">{fmt(page1.totalRow?.totalExpenses)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
         */}
        </Box>
      </Box>
    </Box>
  );
}

function fmt(v) {
  if (v === null || v === undefined || v === "" || v===0) return "";
  const n = Number(v);
  if (Number.isNaN(n)) return String(v);
  return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
