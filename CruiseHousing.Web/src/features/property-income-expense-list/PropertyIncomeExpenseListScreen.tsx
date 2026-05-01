import { useState } from "react";
import ListViewPage from "./ListViewPage";
import PropertyIncomeExpenseScreenHeader from "./PropertyIncomeExpenseListScreenHeader";
import "./index.style.css";
import ListEditPage from "./ListEditPage";
import ListDownloadPage from "./ListDownloadPage";
import { DetailTabValue } from "./subjectOptions";

export type ViewMode = "view" | "edit" | "download";
export type EditOpenContext = {
  detailTabValue: DetailTabValue;
  subjectTabField: string;
  yearMonth?: string;
};

export default function PropertyIncomeExpenseDetailScreen() {
  const [viewMode, setViewMode] = useState<ViewMode>("view");
  const [editOpenContext, setEditOpenContext] =
    useState<EditOpenContext | null>(null);

  const openEditPage = (context: EditOpenContext) => {
    setEditOpenContext(context);
    setViewMode("edit");
  };

  return (
    <div className="property-income-expense-list-container">
      <PropertyIncomeExpenseScreenHeader
        viewMode={viewMode}
        onChange={setViewMode}
      />

      {viewMode === "view" ? (
        <ListViewPage onOpenEditPage={openEditPage} />
      ) : viewMode === "edit" ? (
        <ListEditPage editOpenContext={editOpenContext} />
      ) : (
        <ListDownloadPage />
      )}
    </div>
  );
}