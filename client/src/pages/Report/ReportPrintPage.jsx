import React, { useMemo, useRef } from "react";
import { Button, Box } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import { Report4Pages } from "./Report4Pages";

export default function ReportPrintPage() {
  const printRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "収支報告書",
    pageStyle: "@page{size:A4 landscape;margin:8mm;}",
  });

  // ✅ Bạn map data thật của bạn vào đây
  const data = useMemo(
    () => ({
      header: {
        noteTop: "御中",
        titleBar: "2025年8月度　収支報告書",
        // bảng info góc trái (giống trang 1)
        summary: {
          net: "$99,999.99",
          nextPlan: "$99,999.99",
          propertyNo: "E-01",
          address: "",
          startDate: "12/15/2023",
        },
      },

      // page1: 月次収入・支出
      page1: {
        rows: [
          { id:1, room:"101", rentIncome:99999.99, otherIncome:99999.99, incomeSub:99999.99, managementFee:99999.99, repairCost:99999.99, reserveFund:99999.99, propertyTax:99999.99, insuranceFee:99999.99, hoaFee:99999.99, taxReport:99999.99, misc:99999.99, serviceFee: 99999.99, otherExpenses:99999.99, expenseSubtotal:99999.99, totalExpenses:99999.99, cellColors: {} },
          { id:2, room:"102", rentIncome:0, otherIncome:0, incomeSub:0, managementFee:0, repairCost:0, reserveFund:0, propertyTax:0, insuranceFee:0, hoaFee:0, taxReport:0, misc:0, serviceFee: 0, otherExpenses:0, expenseSubtotal:0, totalExpenses:0, cellColors: {} },
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
        ],
        totalRow: {
          rentIncome: 99999.99,
          otherIncome: 99999.99,
          incomeSub: 99999.99,
          managementFee: 99999.99,
          repairCost: 99999.99,
          reserveFund: 99999.99,
          propertyTax: 99999.99,
          insuranceFee:99999.99,
          hoaFee:99999.99,
          taxReport:99999.99,
          misc:99999.99,
          serviceFee: 99999.99,
          otherExpenses:99999.99,
          expenseSubtotal:99999.99,
          totalExpenses:99999.99
        },
      },

      // page2: お預かり残高および累計収支
      page2: {
        months: ["4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月", "1月", "2月", "3月"]
      },

      // page3: 科目別明細 (2 block trái/phải)
      page3: {
        left: [
          // { category:"賃料", room:"101", content:"賃料 2025-08 家賃等", income:2150, expense:null }
        ],
        right: [
          // { category:"修繕費", room:"共用部", content:"…", income:null, expense:104 }
        ],
        footerText: "2025年8月度合計",
      },

      // page4: 特記事項
      page4: {
        text: `（1）修繕工事
…`,
      },
    }),
    []
  );

  return (
    <Box>
      <div ref={printRef}>
        <Report4Pages data={data} />
      </div>
    </Box>
  );
}
