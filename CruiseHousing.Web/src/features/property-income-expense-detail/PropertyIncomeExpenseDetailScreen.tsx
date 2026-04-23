import { useState } from "react";
import DetailPage from "./DetailPage";
import SummaryPage from "./SummaryPage";
import PropertyIncomeExpenseScreenHeader from "./PropertyIncomeExpenseDetailScreenHeader";

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
        <DetailPage />
      ) : (
        <SummaryPage />
      )}
    </div>
  );
}