import { useEffect, useState } from "react";
import { AlertColor, Button, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

import "./index.style.css";
import { initialPropertyTabs } from "./data.dump";
import { type PropertyIncomeExpenseDetailRow, type PropertyTabData } from "./types";
import PropertyHeader from "./PropertyHeader";
import PropertyIncomeExpenseDetailGrid from "./PropertyIncomeExpenseDetailGrid";
import PropertyIncomeExpenseTabs from "./PropertyIncomeExpenseTabs";

import CommonToast from "../shared/CommonToast";
import LoadingDialog from "../shared/LoadingDialog";
import { downloadCsvStub } from "../shared/csv";
import { usePropertySelectionStore } from "@/stores/propertySelectionStore";

/**
 * TabPanel component
 * - Render content only when the tab is active
 * - This prevents unnecessary rendering of all tabs
 */
const TabPanel = ({
  active,
  header,
  rows,
  onRowsChange,
}: {
  active: boolean;
  header: PropertyTabData["header"];
  rows: PropertyIncomeExpenseDetailRow[];
  onRowsChange: (nextRows: PropertyIncomeExpenseDetailRow[]) => void;
}) => {
  // Do not render if not active
  if (!active) return null;

  return (
    <>
      {/* Property header section */}
      <PropertyHeader {...header} />

      {/* DataGrid container */}
      <div className="property-income-expense-detail-grid-contaniner">
        <PropertyIncomeExpenseDetailGrid rows={rows} onRowsChange={onRowsChange} />
      </div>
    </>
  );
};

/**
 * Main screen: PropertyIncomeExpenseDetail
 * Responsibilities:
 * - Manage tab state
 * - Manage loading / toast
 * - Handle user actions (refresh, download, save)
 * - Compose UI (Tabs + Grid + Footer)
 */
export default function PropertyIncomeExpenseDetail() {
  // Loading state for async actions (save, download, refresh)
  const [loading, setLoading] = useState(false);

  // Current active tab index
  const [activeTab, setActiveTab] = useState(0);

  // Tabs data (each tab contains header + rows)
  const [propertyTabs, setPropertyTabs] = useState<PropertyTabData[]>(initialPropertyTabs);

  // Toast notification state
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  /**
   * Get selected propertyCode from global store (Zustand)
   * Used to sync tab selection when navigating from another screen
   */
  const propertyCode = usePropertySelectionStore((state) => state.selectedPropertyCode);

  /**
   * Sync active tab when propertyCode changes
   */
  useEffect(() => {
    if (!propertyCode) return;

    const index = propertyTabs.findIndex(
      (tab) => tab.header.propertyCode === propertyCode
    );

    if (index !== -1) {
      setActiveTab(index);
    }
  }, [propertyCode, propertyTabs]);

  // Current active tab data
  const activeProperty = propertyTabs[activeTab];

  /**
   * Show toast notification
   */
  const showToast = (message: string, severity: AlertColor = "success") => {
    setToast({ open: true, message, severity });
  };

  /**
   * Update rows of current active tab
   */
  const updateActiveRows = (nextRows: PropertyIncomeExpenseDetailRow[]) => {
    setPropertyTabs((prev) =>
      prev.map((tab, index) =>
        index === activeTab
          ? {
              ...tab,
              rows: nextRows,
            }
          : tab
      )
    );
  };

  /**
   * Handle Save action
   */
  const handleUpdate = async () => {
    try {
      setLoading(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      showToast(`${activeProperty.header.propertyCode} を保存しました。`);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle Refresh action
   */
  const handleLoading = async () => {
    try {
      setLoading(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle CSV download
   */
  const handleDownload = async () => {
    try {
      setLoading(true);

      await downloadCsvStub(`${activeProperty.header.propertyCode}.csv`);

      showToast("CSVをダウンロードしました。");
    } catch (_error) {
      showToast("ダウンロードに失敗しました。", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="property-income-expense-detail-container">
      {/* ===== Header Actions ===== */}
      <div className="property-income-expense-detail-common-header">
        <div className="common-header-item" onClick={handleLoading}>
          <RefreshIcon />
          <Typography>最新情報を更新</Typography>
        </div>

        <div className="common-header-item" onClick={handleDownload}>
          <SaveAltIcon />
          <Typography>エクセルでダウンロードする</Typography>
        </div>
      </div>

      {/* ===== Title ===== */}
      <Typography sx={{ fontSize: "150%", fontWeight: "500", paddingBottom: 2 }}>
        物件収支明細
      </Typography>

      {/* ===== Tabs ===== */}
      <PropertyIncomeExpenseTabs
        activeTab={activeTab}
        propertyTabs={propertyTabs}
        onChange={setActiveTab}
      />

      {/* ===== Tab Panels ===== */}
      {propertyTabs.map((propertyTab, index) => (
        <TabPanel
          key={propertyTab.id}
          active={index === activeTab}
          header={propertyTab.header}
          rows={propertyTab.rows}
          onRowsChange={updateActiveRows}
        />
      ))}

      {/* ===== Footer Actions ===== */}
      <div className="property-income-expense-detail-footer">
        <Button variant="contained" color="success" onClick={handleUpdate} disabled={loading}>
          保存
        </Button>

        <Button variant="contained" color="warning" onClick={handleLoading} disabled={loading}>
          キャンセル
        </Button>
      </div>

      {/* ===== Loading Dialog ===== */}
      <LoadingDialog open={loading} />

      {/* ===== Toast Notification ===== */}
      <CommonToast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
}