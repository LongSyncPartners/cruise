import { useEffect, useMemo, useState } from "react";
import { Button, Typography } from "@mui/material";

import "./index.style.css";
import {
  type PropertyIncomeExpenseDetailRow,
} from "./types";

import PropertyIncomeExpenseTabs from "./detail/DetailTabs";

import LoadingDialog from "../shared/LoadingDialog";
import { usePropertySelectionStore } from "@/stores/propertySelectionStore";
import { usePropertyIncomeExpenseTabs } from "@/hooks/usePropertyIncomeExpenseTabs";
import { usePropertyIncomeExpenseRows } from "@/hooks/usePropertyIncomeExpenseRows";
import { useSavePropertyIncomeExpenseRows } from "@/hooks/useSavePropertyIncomeExpenseRows";
import UnsavedChangesDialog from "../shared/UnsavedChangesDialog";
import { usePropertyIncomeExpenseValidation } from "./detail/useDetailValidation";
import { usePropertyIncomeExpenseCalculation } from "./detail/useDetailCalculation";
import { usePropertyIncomeExpenseGroups } from "@/hooks/usePropertyIncomeExpenseGroups";
import { useDefaultPropertyCodeByGroup } from "@/hooks/useDefaultPropertyCodeByGroup";

import { useAppToast } from "@/providers/ToastProvider";
import { PropertyTabSummary } from "@/features/shared/types";
import { TabPanel } from "./detail/DetailTabPanel";
import FloatingPanel from "./detail/FloatingPanel";
import { CellContextMenuState } from "../shared/CustomContextMenu";
import { recalculateBalances } from "./detail/DetailRowUtils";

/**
 * Fallback empty values to avoid recreating new empty arrays on every render.
 */
const EMPTY_TABS: PropertyTabSummary[] = [];
const EMPTY_ROWS: PropertyIncomeExpenseDetailRow[] = [];



export default function DetailPage() {
  /**
   * Local UI state
   */
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [editedRows, setEditedRows] = useState<PropertyIncomeExpenseDetailRow[]>([]);
  const [selectedPropertyIncomeExpenseDetailRows, setSelectedPropertyIncomeExpenseDetailRows] =
  useState<PropertyIncomeExpenseDetailRow[]>([]);
  const [isDirty, setIsDirty] = useState(false);
  const [pendingTab, setPendingTab] = useState<number | null>(null);
  const [confirmTabChangeOpen, setConfirmTabChangeOpen] = useState(false);
  const { recalculateRows } = usePropertyIncomeExpenseCalculation();

  /**
   * Validation hook for all editable rows.
   * Currently prepared for save validation.
   */
  const { validateRows } = usePropertyIncomeExpenseValidation();

  /**
   * Selected property code from global store.
   * This is usually set from the property list screen.
   */
  const selectedPropertyCode = usePropertySelectionStore(
    (state) => state.selectedPropertyCode
  );

  const setSelectedPropertyCode = usePropertySelectionStore(
    (state) => state.setSelectedPropertyCode
  );

  /**
   * Fetch property tab list based on selected property code.
   */
  const {
    data: propertyTabsData,
    isLoading: isTabsLoading,
    refetch: refetchTabs,
  } = usePropertyIncomeExpenseTabs(selectedPropertyCode ?? undefined);

  const propertyTabs = propertyTabsData ?? EMPTY_TABS;

  /**
   * Resolve the currently active property tab.
   */
  const activeProperty = useMemo<PropertyTabSummary | undefined>(() => {
    return propertyTabs[activeTab];
  }, [propertyTabs, activeTab]);

  /**
   * Active property code used to fetch row details and save data.
   */
  const activePropertyCode = activeProperty?.header.propertyCode;

  /**
   * Fetch detail rows for the active property tab.
   */
  const {
    data: fetchedRowsData,
    isLoading: isRowsLoading,
    refetch: refetchRows,
  } = usePropertyIncomeExpenseRows(activePropertyCode);

  const fetchedRows = fetchedRowsData ?? EMPTY_ROWS;

  /**
   * Open toast message.
   */
  const { showToast } = useAppToast();

  const { data: groups = [] } = usePropertyIncomeExpenseGroups();
  
  const [selectedGroup, setSelectedGroup] = useState<string>("");

  const { data: defaultPropertyCode, isFetching } = 
    useDefaultPropertyCodeByGroup(selectedGroup);

  const handleGroupChange = async (newGroup: string) => {
     if (newGroup === selectedGroup) return;

    setSelectedGroup(newGroup);
    setActiveTab(0);
    setEditedRows([]);
    setIsDirty(false);
  }

  /**
   * Update editable rows from child grid.
   */
  const updateActiveRows = (nextRows: PropertyIncomeExpenseDetailRow[]) => {
    setEditedRows(nextRows);
  };

  /**
   * Handle tab switching.
   * If the current tab has unsaved changes, show confirmation dialog first.
   */
  const handleTabChange = (nextTab: number) => {
    if (nextTab === activeTab) return;

    if (isDirty) {
      setPendingTab(nextTab);
      setConfirmTabChangeOpen(true);
      return;
    }

    setActiveTab(nextTab);
  };

  /**
   * Save current tab data, then move to the pending tab.
   */
  const handleSaveAndTabChange = async () => {
    if (!activePropertyCode || pendingTab === null) return;

    /*
    const validationResult = validateRows(editedRows);
    if (!validationResult.isValid) {
      showToast(validationResult.errorMessage ?? "入力内容に誤りがあります。", "error");
      setConfirmTabChangeOpen(false);
      return;
    }
    */

    try {
      setLoading(true);

      await saveRows({
        propertyCode: activePropertyCode,
        rows: editedRows,
      });

      showToast(`${activePropertyCode} を保存しました。`);
      setIsDirty(false);
      setConfirmTabChangeOpen(false);
      setActiveTab(pendingTab);
      setPendingTab(null);
    } catch (error) {
      if (error instanceof Error) {
        showToast(error.message, "error");
      } else {
        showToast("保存に失敗しました。", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Discard current edits and move to the pending tab.
   */
  const handleDiscardTabChange = () => {
    if (pendingTab === null) return;

    setConfirmTabChangeOpen(false);
    setIsDirty(false);
    setActiveTab(pendingTab);
    setPendingTab(null);
  };

  /**
   * Close unsaved changes dialog without changing tab.
   */
  const handleCancelTabChange = () => {
    setPendingTab(null);
    setConfirmTabChangeOpen(false);
  };

  /**
   * Mutation hook for saving rows to the backend.
   */
  const { mutateAsync: saveRows, isPending: isSaving } =
    useSavePropertyIncomeExpenseRows();

  /**
   * Save the current editable rows.
   */
  const handleUpdate = async () => {
    if (!activePropertyCode) return;

    
    const validationResult = validateRows(editedRows);
    if (!validationResult.isValid) {
      console.log(validationResult);
      showToast(validationResult.errorMessage ?? "入力内容に誤りがあります。", "error");
      return;
    }

    try {
      setLoading(true);

      await saveRows({
        propertyCode: activePropertyCode,
        rows: editedRows,
      });

      setIsDirty(false);
      showToast(`${activePropertyCode} を保存しました。`);
    } catch (error) {
      if (error instanceof Error) {
        showToast("保存に失敗しました。", "error", error.message);
      } else {
        showToast("保存に失敗しました。", "error", `${error}`);
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Refresh both detail rows and tab summary data from the server.
   * If row data is returned, overwrite local edits and clear dirty state.
   */
  const handleRefresh = async () => {
    try {
      setLoading(true);

      const res = await refetchRows();

      if (res.data) {
        // Reset local edited rows with latest fetched data
        setEditedRows(recalculateRows(res.data));
        setIsDirty(false);
      }

      await refetchTabs();
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cancel current edits and restore the latest fetched rows.
   */
  const handleCancel = () => {
    setEditedRows(recalculateRows(fetchedRows ?? []).map((row) => ({ ...row })));
    setIsDirty(false);
  };

  const [selectedRow, setSelectedRow] = useState<PropertyIncomeExpenseDetailRow | null>(null);

  const onOpenFloatPannelClick = (_menu: NonNullable<CellContextMenuState>) => {
    setSelectedRow(_menu.row as PropertyIncomeExpenseDetailRow);
    setIsFloatPanelOpen(true);
  };

  const handleSelectedRowChange = (nextRow: PropertyIncomeExpenseDetailRow) => {
    setSelectedRow(nextRow);
    setEditedRows((prevRows) => {
      const nextRows = prevRows.map((row) =>
        row.id === nextRow.id ? nextRow : row
      );

      return recalculateBalances(nextRows);
    });
  };

  const [isFloatPanelOpen, setIsFloatPanelOpen] = useState(false);

  /**
   * Combined loading flag for the whole screen.
   */
  const isScreenLoading = loading || isTabsLoading || isRowsLoading || isSaving;

  useEffect(() => {
    if (selectedGroup) {
      setSelectedPropertyCode(defaultPropertyCode ?? "");
    }
  }, [defaultPropertyCode]);
  
  /**
   * When the selected property code changes from the store,
   * switch to the corresponding tab if it exists.
   */
  useEffect(() => {
    if (!selectedPropertyCode || propertyTabs.length === 0) return;

    const index = propertyTabs.findIndex(
      (tab) => tab.header.propertyCode === selectedPropertyCode
    );

    if (index !== -1 && index !== activeTab) {
      setActiveTab(index);
    }
  }, [selectedPropertyCode, propertyTabs]);

  /**
   * Reset editable rows whenever fresh rows are fetched.
   * Also clear dirty state because the screen is now synced with server data.
   */
  useEffect(() => {
    setEditedRows(recalculateRows(fetchedRows));
    setIsDirty(false);
  }, [fetchedRows, recalculateRows]);

  /**
   * Recalculate balances and expected amounts for all rows when any row is updated.
     * This is a simplified example of how to trigger recalculation from the main component.
   */
  return (
    <div>
      {/* Property tab selector */}
      <PropertyIncomeExpenseTabs
        groups={groups}
        onGroupChange={handleGroupChange}
        activeTab={activeTab}
        propertyTabs={propertyTabs}
        onChange={handleTabChange}
      />

      {/* Render tab content */}
      {propertyTabs.map((propertyTab, index) => (
        <TabPanel
          key={propertyTab.id}
          active={index === activeTab}
          header={propertyTab.header}
          rows={index === activeTab ? editedRows : EMPTY_ROWS}
          onRowsChange={updateActiveRows}
          onDirtyChange={() => setIsDirty(true)}
          onSelectedRowsChange={setSelectedPropertyIncomeExpenseDetailRows}
          onSelectedRowChange={setSelectedRow}
          isScreenLoading={isScreenLoading}
          onOpenFloatPannelClick={onOpenFloatPannelClick}
        />
      ))}

      {/* Show guidance when no property is selected */}
      {!selectedPropertyCode ? (
        <Typography sx={{ mt: 4, color: "text.secondary" }}>
          物件グループをお選択ください。
        </Typography>
      ) : (
        /* Footer actions */
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
            onClick={handleCancel}
            disabled={isScreenLoading}
          >
            キャンセル
          </Button>
        </div>
      )}

      <FloatingPanel
        open={isFloatPanelOpen}
        onClose={() => setIsFloatPanelOpen(false)}
        selectedRow={selectedRow}
        onSelectedRowChange={handleSelectedRowChange}
      />

      {/* Confirm dialog shown when leaving a tab with unsaved changes */}
      <UnsavedChangesDialog
        open={confirmTabChangeOpen}
        message="変更内容が保存されていません。保存してから移動しますか？"
        onSave={handleSaveAndTabChange}
        onDiscard={handleDiscardTabChange}
        onCancel={handleCancelTabChange}
      />

      {/* Full-screen loading dialog */}
      <LoadingDialog open={isScreenLoading} />
    </div>
  );
}