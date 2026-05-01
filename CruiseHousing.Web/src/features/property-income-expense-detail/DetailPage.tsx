import { useEffect, useMemo, useState } from "react";
import { Button, Typography } from "@mui/material";

import "./index.style.css";
import { type PropertyIncomeExpenseDetailRow } from "./types";

import PropertyIncomeExpenseTabs from "./detail/DetailTabs";
import LoadingDialog from "../shared/LoadingDialog";
import UnsavedChangesDialog from "../shared/UnsavedChangesDialog";
import FloatingPanel from "./detail/FloatingPanel";

import { usePropertySelectionStore } from "@/stores/propertySelectionStore";

import { usePropertyIncomeExpenseDetailRows } from "@/hooks/usePropertyIncomeExpenseDetailRows";
import { useSavePropertyIncomeExpenseDetailRows } from "@/hooks/useSavePropertyIncomeExpenseDetailRows";
import { usePropertyGroups } from "@/hooks/usePropertyGroups";
import { usePropertiesByGroup } from "@/hooks/usePropertiesByGroup";
import { usePropertyGroupByPropertyCode } from "@/hooks/usePropertyGroupByPropertyCode";

import { useAppToast } from "@/providers/ToastProvider";
import { PropertyTabSummary } from "@/features/shared/types";
import { TabPanel } from "./detail/DetailTabPanel";
import { CellContextMenuState } from "../shared/CustomContextMenu";
import { recalculateBalances } from "./detail/DetailRowUtils";
import { usePropertyIncomeExpenseValidation } from "./detail/useDetailValidation";
import { usePropertyIncomeExpenseCalculation } from "./detail/useDetailCalculation";


const EMPTY_TABS: PropertyTabSummary[] = [];
const EMPTY_ROWS: PropertyIncomeExpenseDetailRow[] = [];

export default function DetailPage() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [editedRows, setEditedRows] =
    useState<PropertyIncomeExpenseDetailRow[]>([]);
  const [
    selectedPropertyIncomeExpenseDetailRows,
    setSelectedPropertyIncomeExpenseDetailRows,
  ] = useState<PropertyIncomeExpenseDetailRow[]>([]);

  const [isDirty, setIsDirty] = useState(false);
  const [pendingTab, setPendingTab] = useState<number | null>(null);
  const [confirmTabChangeOpen, setConfirmTabChangeOpen] = useState(false);

  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [selectedRow, setSelectedRow] =
    useState<PropertyIncomeExpenseDetailRow | null>(null);
  const [isFloatPanelOpen, setIsFloatPanelOpen] = useState(false);

  const selectedPropertyCode = usePropertySelectionStore(
    (state) => state.selectedPropertyCode
  );

  const setSelectedPropertyCode = usePropertySelectionStore(
    (state) => state.setSelectedPropertyCode
  );

  const { showToast } = useAppToast();
  const { validateRows } = usePropertyIncomeExpenseValidation();
  const { recalculateRows } = usePropertyIncomeExpenseCalculation();

  /**
   * 0. Master: group list
   */
  const { data: groups = [], isLoading: isGroupsLoading } =
    usePropertyGroups();

  /**
   * 1. If selectedPropertyCode exists, resolve selectedGroup.
   */
  const {
    data: resolvedGroup,
    isLoading: isResolvingGroup,
  } = usePropertyGroupByPropertyCode(selectedPropertyCode);

  /**
   * 1.2 / 2.1 Fetch property list by selectedGroup.
   * Convert to property tabs inside hook.
   */
  const {
    data: propertyTabsData,
    isLoading: isTabsLoading,
    refetch: refetchTabsByGroup,
  } = usePropertiesByGroup(selectedGroup || undefined);

  const propertyTabs: PropertyTabSummary[]  = propertyTabsData ?? EMPTY_TABS;

  const activeProperty = useMemo<PropertyTabSummary | undefined>(() => {
    return propertyTabs[activeTab];
  }, [propertyTabs, activeTab]);

  const activePropertyCode = activeProperty?.header.propertyCode;

  /**
   * 1.4 / 2.4 / 3 Fetch rows by activePropertyCode.
   */
  const {
    data: fetchedRowsData,
    isLoading: isRowsLoading,
    refetch: refetchRows,
  } = usePropertyIncomeExpenseDetailRows(activePropertyCode);

  const fetchedRows = fetchedRowsData ?? EMPTY_ROWS;

  const { mutateAsync: saveRows, isPending: isSaving } =
    useSavePropertyIncomeExpenseDetailRows();

  const isScreenLoading =
    loading ||
    isGroupsLoading ||
    isResolvingGroup ||
    isTabsLoading ||
    isRowsLoading ||
    isSaving;

  const handleGroupChange = (newGroup: string) => {
    if (newGroup === selectedGroup) return;

    setSelectedGroup(newGroup);
    setSelectedPropertyCode(null);
    setActiveTab(0);
    setEditedRows([]);
    setIsDirty(false);
    setSelectedRow(null);
    setIsFloatPanelOpen(false);
  };

  const updateActiveRows = (nextRows: PropertyIncomeExpenseDetailRow[]) => {
    setEditedRows(nextRows);
  };

  const moveToTab = (nextTab: number) => {
    const nextPropertyCode = propertyTabs[nextTab]?.header.propertyCode;

    setActiveTab(nextTab);

    if (nextPropertyCode) {
      setSelectedPropertyCode(nextPropertyCode);
    }

    setSelectedRow(null);
    setIsFloatPanelOpen(false);
  };

  const handleTabChange = (nextTab: number) => {
    if (nextTab === activeTab) return;

    if (isDirty) {
      setPendingTab(nextTab);
      setConfirmTabChangeOpen(true);
      return;
    }

    moveToTab(nextTab);
  };

  const handleSaveAndTabChange = async () => {
    if (!activePropertyCode || pendingTab === null) return;

    const validationResult = validateRows(editedRows);
    if (!validationResult.isValid) {
      showToast(
        validationResult.errorMessage ?? "入力内容に誤りがあります。",
        "error"
      );
      setConfirmTabChangeOpen(false);
      return;
    }

    try {
      setLoading(true);

      await saveRows({
        propertyCode: activePropertyCode,
        rows: editedRows,
      });

      showToast(`${activePropertyCode} を保存しました。`);

      setIsDirty(false);
      setConfirmTabChangeOpen(false);

      moveToTab(pendingTab);
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

  const handleDiscardTabChange = () => {
    if (pendingTab === null) return;

    setConfirmTabChangeOpen(false);
    setIsDirty(false);

    moveToTab(pendingTab);
    setPendingTab(null);
  };

  const handleCancelTabChange = () => {
    setPendingTab(null);
    setConfirmTabChangeOpen(false);
  };

  const handleUpdate = async () => {
    if (!activePropertyCode) return;

    const validationResult = validateRows(editedRows);
    if (!validationResult.isValid) {
      showToast(
        validationResult.errorMessage ?? "入力内容に誤りがあります。",
        "error"
      );
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

  const handleRefresh = async () => {
    if (!activePropertyCode) return;

    try {
      setLoading(true);

      const res = await refetchRows();

      if (res.data) {
        setEditedRows(recalculateRows(res.data));
        setIsDirty(false);
      }

      await refetchTabsByGroup();
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditedRows(recalculateRows(fetchedRows).map((row) => ({ ...row })));
    setIsDirty(false);
  };

  const onOpenFloatPanelClick = (_menu: NonNullable<CellContextMenuState>) => {
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

    setIsDirty(true);
  };

  useEffect(() => {
    if (!selectedPropertyCode) return;
    if (!resolvedGroup) return;

    setSelectedGroup(resolvedGroup);
  }, [selectedPropertyCode, resolvedGroup]);

  /**
   * 1.3 / 2.3 Decide active tab.
   */
  useEffect(() => {
    if (!selectedGroup) return;
    if (propertyTabs.length === 0) return;

    if (selectedPropertyCode) {
      const index = propertyTabs.findIndex(
        (tab: PropertyTabSummary) => tab.header.propertyCode === selectedPropertyCode
      );

      if (index >= 0) {
        setActiveTab(index);
        return;
      }
    }

    const firstPropertyCode = propertyTabs[0]?.header.propertyCode;
    if (!firstPropertyCode) return;

    setSelectedPropertyCode(firstPropertyCode);
    setActiveTab(0);
  }, [
    selectedGroup,
    propertyTabs,
    selectedPropertyCode,
    setSelectedPropertyCode,
  ]);

  useEffect(() => {
    if (!activePropertyCode) {
      setEditedRows([]);
      setIsDirty(false);
      return;
    }

    setEditedRows(recalculateRows(fetchedRows));
    setIsDirty(false);
  }, [activePropertyCode, fetchedRows, recalculateRows]);

  return (
    <div>
      <PropertyIncomeExpenseTabs
        groups={groups}
        onGroupChange={handleGroupChange}
        activeTab={activeTab}
        propertyTabs={propertyTabs}
        onChange={handleTabChange}
      />

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
          onOpenFloatPanelClick={onOpenFloatPanelClick}
        />
      ))}

      {!activePropertyCode ? (
        <Typography sx={{ mt: 4, color: "text.secondary" }}>
          物件グループを選択してください。
        </Typography>
      ) : (
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

      <UnsavedChangesDialog
        open={confirmTabChangeOpen}
        message="変更内容が保存されていません。保存してから移動しますか？"
        onSave={handleSaveAndTabChange}
        onDiscard={handleDiscardTabChange}
        onCancel={handleCancelTabChange}
      />

      <LoadingDialog open={isScreenLoading} />
    </div>
  );
}