import { useEffect, useMemo, useState } from "react";
import { AlertColor, Button, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

import "./index.style.css";
import {
  type PropertyHeaderProps,
  type PropertyIncomeExpenseDetailRow,
  type PropertyTabSummary,
} from "./types";
import PropertyHeader from "./PropertyHeader";
import PropertyIncomeExpenseDetailGrid from "./PropertyIncomeExpenseDetailGrid";
import PropertyIncomeExpenseTabs from "./PropertyIncomeExpenseTabs";

import CommonToast from "../shared/CommonToast";
import LoadingDialog from "../shared/LoadingDialog";
import { downloadCsvStub } from "../shared/csv";
import { usePropertySelectionStore } from "@/stores/propertySelectionStore";
import { usePropertyIncomeExpenseTabs } from "@/hooks/usePropertyIncomeExpenseTabs";
import { usePropertyIncomeExpenseRows } from "@/hooks/usePropertyIncomeExpenseRows";

const EMPTY_TABS: PropertyTabSummary[] = [];
const EMPTY_ROWS: PropertyIncomeExpenseDetailRow[] = [];

const TabPanel = ({
  active,
  header,
  rows,
  onRowsChange,
}: {
  active: boolean;
  header?: PropertyHeaderProps;
  rows: PropertyIncomeExpenseDetailRow[];
  onRowsChange: (nextRows: PropertyIncomeExpenseDetailRow[]) => void;
}) => {
  if (!active || !header) return null;

  return (
    <>
      <PropertyHeader {...header} />
      <div className="property-income-expense-detail-grid-contaniner">
        <PropertyIncomeExpenseDetailGrid rows={rows} onRowsChange={onRowsChange} />
      </div>
    </>
  );
};

export default function PropertyIncomeExpenseDetail() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [editedRows, setEditedRows] = useState<PropertyIncomeExpenseDetailRow[]>([]);
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const selectedPropertyCode = usePropertySelectionStore(
    (state) => state.selectedPropertyCode
  );

  const {
    data: propertyTabsData,
    isLoading: isTabsLoading,
    refetch: refetchTabs,
  } = usePropertyIncomeExpenseTabs(selectedPropertyCode ?? undefined);;

  const propertyTabs = propertyTabsData ?? EMPTY_TABS;

  const activeProperty = useMemo<PropertyTabSummary | undefined>(() => {
    console.log("1", "activeTab:", activeTab);
    return propertyTabs[activeTab];
  }, [propertyTabs, activeTab]);

  const activePropertyCode = activeProperty?.header.propertyCode;

  const {
    data: fetchedRowsData,
    isLoading: isRowsLoading,
    refetch: refetchRows,
  } = usePropertyIncomeExpenseRows(activePropertyCode);

  const fetchedRows = fetchedRowsData ?? EMPTY_ROWS;

  useEffect(() => {
    if (!selectedPropertyCode || propertyTabs.length === 0) return;

    const index = propertyTabs.findIndex(
      (tab) => tab.header.propertyCode === selectedPropertyCode
    );

    if (index !== -1 && index !== activeTab) {
      setActiveTab(index);
    }
  }, [selectedPropertyCode, propertyTabs]);

  useEffect(() => {
    setEditedRows(fetchedRows);
  }, [fetchedRows]);

  const showToast = (message: string, severity: AlertColor = "success") => {
    setToast({ open: true, message, severity });
  };

  const updateActiveRows = (nextRows: PropertyIncomeExpenseDetailRow[]) => {
    setEditedRows(nextRows);
  };

  const handleUpdate = async () => {
    if (!activeProperty) return;

    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      showToast(`${activeProperty.header.propertyCode} を保存しました。`);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    try {
      setLoading(true);
      const res = await refetchRows();
      if (res.data) {
        setEditedRows(res.data); // reset edited rows to fetched rows after refresh
      }
      await refetchTabs();
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!activeProperty) return;

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

  const isScreenLoading = loading || isTabsLoading || isRowsLoading;

  return (
    <div className="property-income-expense-detail-container">
      <div className="property-income-expense-detail-common-header">
        <div className="common-header-item" onClick={handleRefresh}>
          <RefreshIcon />
          <Typography>最新情報を更新</Typography>
        </div>

        <div className="common-header-item" onClick={handleDownload}>
          <SaveAltIcon />
          <Typography>エクセルでダウンロードする</Typography>
        </div>
      </div>

      <Typography sx={{ fontSize: "150%", fontWeight: "500", paddingBottom: 2 }}>
        物件収支明細
      </Typography>

      <PropertyIncomeExpenseTabs
        activeTab={activeTab}
        propertyTabs={propertyTabs}
        onChange={setActiveTab}
      />

      {propertyTabs.map((propertyTab, index) => (
        <TabPanel
          key={propertyTab.id}
          active={index === activeTab}
          header={propertyTab.header}
          rows={index === activeTab ? editedRows : EMPTY_ROWS}
          onRowsChange={updateActiveRows}
        />
      ))}

      <div className="property-income-expense-detail-footer">
        <Button
          variant="contained"
          color="success"
          onClick={handleUpdate}
          disabled={isScreenLoading}
        >
          保存
        </Button>

        <Button
          variant="contained"
          color="warning"
          onClick={handleRefresh}
          disabled={isScreenLoading}
        >
          キャンセル
        </Button>
      </div>

      <LoadingDialog open={isScreenLoading} />

      <CommonToast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
}