import { useState } from "react";
import PropertyIncomeExpenseDetailPage from "./PropertyIncomeExpenseDetailPage";
import PropertyIncomeExpenseSummaryPage from "./PropertyIncomeExpenseSummaryPage";
import PropertyIncomeExpenseScreenHeader from "./PropertyIncomeExpenseScreenHeader";

export type ViewMode = "detail" | "summary";

export default function PropertyIncomeExpenseScreen() {
  const [viewMode, setViewMode] = useState<ViewMode>("detail");

  return (
    <div className="property-income-expense-detail-container">
      <PropertyIncomeExpenseScreenHeader
        viewMode={viewMode}
        onChange={setViewMode}
      />

      {viewMode === "detail" ? (
        <PropertyIncomeExpenseDetailPage />
      ) : (
        <PropertyIncomeExpenseSummaryPage />
      )}
    </div>
  );
}