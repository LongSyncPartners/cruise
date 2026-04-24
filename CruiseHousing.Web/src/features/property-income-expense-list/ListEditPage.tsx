import { useEffect, useMemo, useState } from "react";

import "./index.style.css";
import {
  ListEditRow,
  type SubjectTabInfo,
} from "./types";

import LoadingDialog from "../shared/LoadingDialog";
import UnsavedChangesDialog from "../shared/UnsavedChangesDialog";
import { usePropertySelectionStore } from "@/stores/propertySelectionStore";
import { usePropertyIncomeExpenseTabs } from "@/hooks/usePropertyIncomeExpenseTabs";
import { usePropertyIncomeExpenseRows } from "@/hooks/usePropertyIncomeExpenseRows";
import { useSavePropertyIncomeExpenseRows } from "@/hooks/useSavePropertyIncomeExpenseRows";
import { usePropertyIncomeExpenseValidation } from "./edit/useListEditPageValidation";
import { usePropertyIncomeExpenseGroups } from "@/hooks/usePropertyIncomeExpenseGroups";
import { useDefaultPropertyCodeByGroup } from "@/hooks/useDefaultPropertyCodeByGroup";
import { useAppToast } from "@/providers/ToastProvider";

import ListEditPageHeader from "./edit/ListEditPageHeader";

import {
  createListEditRows,
} from "./data.dump";
import ListEditGrid from "./edit/ListEditGrid";
import { Button, Typography } from "@mui/material";
import { PropertyTabSummary } from "../shared/commonTypes";
import { DETAIL_TAB_OPTIONS, DETAIL_TAB_VALUES, DetailTabValue, getSubjectOptionsByDetailTab } from "./subjectOptions";

const EMPTY_TABS: PropertyTabSummary[] = [];
const EMPTY_ROWS: ListEditRow[] = [];

export default function ListEditPage() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const [detailTabValue, setDetailTabValue] = useState<DetailTabValue>(
    DETAIL_TAB_VALUES.ALL
  );
  const [subjectTabValue, setSubjectTabValue] = useState(0);

  const [editedRows, setEditedRows] = useState<ListEditRow[]>([]);
  const [selectedListEditRows, setSelectedListEditRows] =
    useState<ListEditRow[]>([]);
  const [isDirty, setIsDirty] = useState(false);
  const [pendingTab, setPendingTab] = useState<number | null>(null);
  const [confirmTabChangeOpen, setConfirmTabChangeOpen] = useState(false);

  const { validateRows } = usePropertyIncomeExpenseValidation();
  const { showToast } = useAppToast();

  const selectedPropertyCode = usePropertySelectionStore(
    (state) => state.selectedPropertyCode
  );

  const setSelectedPropertyCode = usePropertySelectionStore(
    (state) => state.setSelectedPropertyCode
  );

  const {
    data: propertyTabsData,
    isLoading: isTabsLoading,
    refetch: refetchTabs,
  } = usePropertyIncomeExpenseTabs(selectedPropertyCode ?? undefined);

  const propertyTabs = propertyTabsData ?? EMPTY_TABS;

  const activeProperty = useMemo<PropertyTabSummary | undefined>(() => {
    return propertyTabs[activeTab];
  }, [propertyTabs, activeTab]);

  const activePropertyCode = activeProperty?.header.propertyCode;

  const {
    data: fetchedRowsData,
    isLoading: isRowsLoading,
    refetch: refetchRows,
  } = usePropertyIncomeExpenseRows(activePropertyCode);

  const fetchedRows = fetchedRowsData ?? EMPTY_ROWS;

  const { data: groups = [] } = usePropertyIncomeExpenseGroups();
  const [selectedGroup, setSelectedGroup] = useState<string>("");

  const { data: defaultPropertyCode } =
    useDefaultPropertyCodeByGroup(selectedGroup);

  const { mutateAsync: saveRows, isPending: isSaving } =
    useSavePropertyIncomeExpenseRows();

  const detailTabs = useMemo(() => {
    return DETAIL_TAB_OPTIONS;
  }, []);

  const subjectTabs = useMemo(() => {
    return getSubjectOptionsByDetailTab(detailTabValue);
  }, [detailTabValue]);

  const listEditRows = useMemo(() => {
    return createListEditRows(detailTabValue, subjectTabValue);
  }, [detailTabValue, subjectTabValue]);

  const handleGroupChange = async (newGroup: string) => {
    if (newGroup === selectedGroup) return;

    setSelectedGroup(newGroup);
    setActiveTab(0);
    setDetailTabValue(0);
    setSubjectTabValue(0);
    setEditedRows([]);
    setIsDirty(false);
  };

  const handleChangeDetailTab = (newValue: DetailTabValue) => {
    setDetailTabValue(newValue);
    setSubjectTabValue(0);
  };

  const handleChangeSubjectTab = (newValue: number) => {
    setSubjectTabValue(newValue);
  };

  const updateActiveRows = (nextRows: ListEditRow[]) => {
    setEditedRows(nextRows);
  };

  const handleTabChange = (nextTab: number) => {
    if (nextTab === activeTab) return;

    if (isDirty) {
      setPendingTab(nextTab);
      setConfirmTabChangeOpen(true);
      return;
    }

    setActiveTab(nextTab);

    const nextPropertyCode = propertyTabs[nextTab]?.header.propertyCode;
    if (nextPropertyCode) {
      setSelectedPropertyCode(nextPropertyCode);
    }
  };

  const handleSaveAndTabChange = async () => {
    if (!activePropertyCode || pendingTab === null) return;

    try {
      setLoading(true);



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

  const handleDiscardTabChange = () => {
    if (pendingTab === null) return;

    setConfirmTabChangeOpen(false);
    setIsDirty(false);
    setActiveTab(pendingTab);
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
      showToast(validationResult.errorMessage ?? "入力内容に誤りがあります。", "error");
      return;
    }

    try {
      setLoading(true);



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
    try {
      setLoading(true);

      const res = await refetchRows();

      if (res.data) {
        setEditedRows((res.data));
        setIsDirty(false);
      }

      await refetchTabs();
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditedRows((fetchedRows ?? []));
    setIsDirty(false);
  };

  const isScreenLoading = loading || isTabsLoading || isRowsLoading || isSaving;

  useEffect(() => {
    if (selectedGroup) {
      setSelectedPropertyCode(defaultPropertyCode ?? "");
    }
  }, [defaultPropertyCode, selectedGroup, setSelectedPropertyCode]);

  useEffect(() => {
    if (!selectedPropertyCode || propertyTabs.length === 0) return;

    const index = propertyTabs.findIndex(
      (tab) => tab.header.propertyCode === selectedPropertyCode
    );

    if (index !== -1 && index !== activeTab) {
      setActiveTab(index);
    }
  }, [selectedPropertyCode, propertyTabs, activeTab]);

  useEffect(() => {
    setEditedRows((fetchedRows));
    setIsDirty(false);
  }, [fetchedRows, ]);

  return (
    <div>
      <ListEditPageHeader
        groups={groups}
        onGroupChange={handleGroupChange}
        activeTab={activeTab}
        propertyTabs={propertyTabs}
        onChangePropertyTab={handleTabChange}
        header={activeProperty?.header}
        detailTabValue={detailTabValue}
        detailTabs={detailTabs}
        onChangeDetailTab={handleChangeDetailTab}
        subjectTabValue={subjectTabValue}
        subjectTabs={subjectTabs}
        onChangeSubjectTab={handleChangeSubjectTab}
      />

      <div className="property-income-expense-list-grid-contaniner">
        <ListEditGrid 
          rows={listEditRows} 
          detailTabs={detailTabs}
          detailTabValue={detailTabValue}
          subjectTabs={subjectTabs} 
          subjectTabValue={subjectTabValue}
          
        />
      </div>

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