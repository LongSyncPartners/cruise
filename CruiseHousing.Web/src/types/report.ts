export type ReportRow = {
  id: number;
  room: string;
  rentIncome?: number;
  otherIncome?: number;
  incomeSub?: number;
  managementFee?: number;
  repairCost?: number;
  reserveFund?: number;
  propertyTax?: number;
  insuranceFee?: number;
  hoaFee?: number;
  taxReport?: number;
  misc?: number;
  serviceFee?: number;
  otherExpenses?: number;
  expenseSubtotal?: number;
  totalExpenses?: number;
};

export type ReportData = {
  header: {
    noteTop?: string | null;
    titleBar: string;
    summary: {
      net: string;
      nextPlan: string;
      propertyNo: string;
      address: string;
      startDate: string;
    };
  };

  page1: {
    rows: ReportRow[];
    totalRow: Omit<ReportRow, "id" | "room">;
  };

  page2: {
    months: string[];
  };

  page3: {
    left: Array<{
      category: string;
      room: string;
      content: string;
      income: number | null;
      expense: number | null;
    }>;
    right: Array<{
      category: string;
      room: string;
      content: string;
      income: number | null;
      expense: number | null;
    }>;
    footerText: string;
  };

  page4: {
    text: string;
  };
};