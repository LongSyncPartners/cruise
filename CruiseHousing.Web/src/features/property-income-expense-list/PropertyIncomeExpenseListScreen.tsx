import { useState } from "react";
import ListViewPage from "./ListViewPage";
import PropertyIncomeExpenseScreenHeader from "./PropertyIncomeExpenseListScreenHeader";
import "./index.style.css";
import ListEditPage from "./ListEditPage";
import ListDownloadPage from "./ListDownloadPage";

export type ViewMode = "view" | "edit" | "download";

export default function PropertyIncomeExpenseDetailScreen() {
  const [viewMode, setViewMode] = useState<ViewMode>("view");

  return (
    <div className="property-income-expense-list-container">
      <PropertyIncomeExpenseScreenHeader
        viewMode={viewMode}
        onChange={setViewMode}
      />

      {viewMode === "view" ? (
        <ListViewPage /> ) : ( viewMode === "edit" ? 
        <ListEditPage /> : <ListDownloadPage /> 
      )}
    </div>
  );
}