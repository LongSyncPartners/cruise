import { useCallback, useEffect, useMemo, useState } from "react";

import "./index.style.css";
import {
  type TabInternalOwnerRow,
  type TabOwnerManagementCompanyRow,
  type TabOwnerRow,
  type TabPropertyManagementCompanyRow,
} from "./types";

import LoadingDialog from "../shared/LoadingDialog";
import { usePropertySelectionStore } from "@/stores/propertySelectionStore";
import { usePropertyIncomeExpenseTabs } from "@/hooks/usePropertyIncomeExpenseTabs";
import { usePropertyIncomeExpenseGroups } from "@/hooks/usePropertyIncomeExpenseGroups";
import { useDefaultPropertyCodeByGroup } from "@/hooks/useDefaultPropertyCodeByGroup";

import ListViewPageHeader from "./view/ListViewPageHeader";

import TabInternalOwner from "./view/tab-internal-owner/Tab";
import TabInternalOwnerFloatingPanel from "./view/tab-internal-owner/FloatingPanel";

import TabOwnerManagementCompany from "./view/tab-owner-management-company/Tab";
import TabOwnerManagementCompanyFloatingPanel from "./view/tab-owner-management-company/FloatingPanel";

import TabOwner from "./view/tab-owner/Tab";
import TabOwnerFloatingPanel from "./view/tab-owner/FloatingPanel";

import TabPropertyManagementCompany from "./view/tab-property-management-company/Tab";
import TabPropertyManagementCompanyFloatingPanel from "./view/tab-property-management-company/FloatingPanel";

import {
  createTabInternalOwnerRows,
  createTabOwnerManagementCompanyRows,
  createTabOwnerRows,
  createTabPropertyManagementCompanyRows,
} from "./data.dump";

import { PropertyTabSummary } from "../shared/types";
import { PropertyIncomeExpenseDetailRow } from "../property-income-expense-detail/types";
import { CellContextMenuState } from "../shared/CustomContextMenu";

/**
 * Fallback empty values to avoid recreating new empty arrays on every render.
 */
const EMPTY_TABS: PropertyTabSummary[] = [];
const EMPTY_ROWS: PropertyIncomeExpenseDetailRow[] = [];

type DetailTabPanelProps = {
  active: boolean;
  loaded: boolean;
  children: React.ReactNode;
};

const DetailTabPanel = ({
  active,
  loaded,
  children,
}: DetailTabPanelProps) => {
  if (!loaded) return null;

  return (
    <div role="tabpanel" style={{ display: active ? "block" : "none" }}>
      <div className="property-income-expense-list-grid-contaniner">
        {children}
      </div>
    </div>
  );
};

export default function ListViewPage() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [detailTabValue, setDetailTabValue] = useState(0);
  const [loadedDetailTabs, setLoadedDetailTabs] = useState<number[]>([0]);
  const [selectedYearMonth, setSelectedYearMonth] = useState("2026/04");

  const [
    selectedPropertyManagementCompanyRow,
    setSelectedPropertyManagementCompanyRow,
  ] = useState<TabPropertyManagementCompanyRow | null>(null);

  const [
    selectedOwnerManagementCompanyRow,
    setSelectedOwnerManagementCompanyRow,
  ] = useState<TabOwnerManagementCompanyRow | null>(null);

  const [selectedInternalOwnerRow, setSelectedInternalOwnerRow] =
    useState<TabInternalOwnerRow | null>(null);

  const [selectedOwnerRow, setSelectedOwnerRow] =
    useState<TabOwnerRow | null>(null);

  const [
    isTabPropertyManagementCompanyFloatingPanelOpen,
    setIsTabPropertyManagementCompanyFloatingPanelOpen,
  ] = useState(false);

  const [
    isTabOwnerManagementCompanyFloatingPanelOpen,
    setIsTabOwnerManagementCompanyFloatingPanelOpen,
  ] = useState(false);

  const [
    isTabInternalOwnerFloatingPanelOpen,
    setIsTabInternalOwnerFloatingPanelOpen,
  ] = useState(false);

  const [
    isTabOwnerFloatingPanelOpen,
    setIsTabOwnerFloatingPanelOpen,
  ] = useState(false);

  const closeAllFloatingPanels = () => {
    setIsTabPropertyManagementCompanyFloatingPanelOpen(false);
    setIsTabOwnerManagementCompanyFloatingPanelOpen(false);
    setIsTabInternalOwnerFloatingPanelOpen(false);
    setIsTabOwnerFloatingPanelOpen(false);
  };

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

  const { data: groups = [] } = usePropertyIncomeExpenseGroups();
  const [selectedGroup, setSelectedGroup] = useState<string>("");

  const { data: defaultPropertyCode } =
    useDefaultPropertyCodeByGroup(selectedGroup);

  const yearMonths: string[] = ["2026/04", "2026/05"];

  const propertyManagementCompanyRows =
    useMemo<TabPropertyManagementCompanyRow[]>(() => {
      return createTabPropertyManagementCompanyRows();
    }, []);

  const ownerManagementCompanyRows =
    useMemo<TabOwnerManagementCompanyRow[]>(() => {
      return createTabOwnerManagementCompanyRows();
    }, []);

  const internalOwnerRows = useMemo<TabInternalOwnerRow[]>(() => {
    return createTabInternalOwnerRows();
  }, []);

  const ownerRows = useMemo<TabOwnerRow[]>(() => {
    return createTabOwnerRows();
  }, []);

  const onOpenTabPropertyManagementCompanyFloatPanelClick = (
    menu: NonNullable<CellContextMenuState>
  ) => {
    setSelectedPropertyManagementCompanyRow(
      menu.row as TabPropertyManagementCompanyRow
    );
    setIsTabPropertyManagementCompanyFloatingPanelOpen(true);
  };

  const onOpenTabOwnerManagementCompanyFloatPanelClick = (
    menu: NonNullable<CellContextMenuState>
  ) => {
    setSelectedOwnerManagementCompanyRow(
      menu.row as TabOwnerManagementCompanyRow
    );
    setIsTabOwnerManagementCompanyFloatingPanelOpen(true);
  };

  const onOpenTabInternalOwnerFloatPanelClick = (
    menu: NonNullable<CellContextMenuState>
  ) => {
    setSelectedInternalOwnerRow(menu.row as TabInternalOwnerRow);
    setIsTabInternalOwnerFloatingPanelOpen(true);
  };

  const onOpenTabOwnerFloatPanelClick = (
    menu: NonNullable<CellContextMenuState>
  ) => {
    setSelectedOwnerRow(menu.row as TabOwnerRow);
    setIsTabOwnerFloatingPanelOpen(true);
  };

  const handleGroupChange = async (newGroup: string) => {
    if (newGroup === selectedGroup) return;

    setSelectedGroup(newGroup);
    setActiveTab(0);
    setDetailTabValue(0);
    setLoadedDetailTabs([0]);
  };

  const handleChangeDetailTab = (newValue: number) => {
    if (newValue === detailTabValue) return;
    closeAllFloatingPanels();
    setDetailTabValue(newValue);
    setLoadedDetailTabs((prev) => {
      if (prev.includes(newValue)) return prev;
      return [...prev, newValue];
    });
  };

  const handleTabChange = (nextTab: number) => {
    if (nextTab === activeTab) return;

    setActiveTab(nextTab);
    const nextPropertyCode = propertyTabs[nextTab]?.header.propertyCode;
    if (nextPropertyCode) {
      setSelectedPropertyCode(nextPropertyCode);
    }
  };

  const handleRefresh = async () => {
    try {
      setLoading(true);

      await refetchTabs();
    } finally {
      setLoading(false);
    }
  };

  const handleSelectedPropertyManagementCompanyRowChange = useCallback(
    (row: TabPropertyManagementCompanyRow) => {
      if (!isTabPropertyManagementCompanyFloatingPanelOpen) return;
      setSelectedPropertyManagementCompanyRow(row);
    },
    [isTabPropertyManagementCompanyFloatingPanelOpen]
  );

  const handleSelectedOwnerManagementCompanyRowChange = useCallback(
    (row: TabOwnerManagementCompanyRow) => {
      if (!isTabOwnerManagementCompanyFloatingPanelOpen) return;
      setSelectedOwnerManagementCompanyRow(row);
    },
    [isTabOwnerManagementCompanyFloatingPanelOpen]
  );

  const handleSelectedInternalOwnerRowChange = useCallback(
    (row: TabInternalOwnerRow) => {
      if (!isTabInternalOwnerFloatingPanelOpen) return;
      setSelectedInternalOwnerRow(row);
    },
    [isTabInternalOwnerFloatingPanelOpen]
  );

  const handleSelectedOwnerRowChange = useCallback(
    (row: TabOwnerRow) => {
      if (!isTabOwnerFloatingPanelOpen) return;
      setSelectedOwnerRow(row);
    },
    [isTabOwnerFloatingPanelOpen]
  );

  const isScreenLoading = loading || isTabsLoading;

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

  return (
    <div>
      <ListViewPageHeader
        groups={groups}
        onGroupChange={handleGroupChange}
        activeTab={activeTab}
        propertyTabs={propertyTabs}
        onChangePropertyTab={handleTabChange}
        header={activeProperty?.header}
        selectedYearMonth={selectedYearMonth}
        yearMonths={yearMonths}
        onYearMonthChange={setSelectedYearMonth}
        detailTabValue={detailTabValue}
        onChangeDetailTab={handleChangeDetailTab}
      />

      <div className="property-income-expense-list-grid-contaniner">
        <DetailTabPanel
          active={detailTabValue === 0}
          loaded={loadedDetailTabs.includes(0)}
        >
          <TabPropertyManagementCompany
            rows={propertyManagementCompanyRows}
            onOpenFloatPanelClick={
              onOpenTabPropertyManagementCompanyFloatPanelClick
            }
            onSelectedRowChange={
              handleSelectedPropertyManagementCompanyRowChange
            }
          />
        </DetailTabPanel>

        <DetailTabPanel
          active={detailTabValue === 1}
          loaded={loadedDetailTabs.includes(1)}
        >
          <TabOwnerManagementCompany
            rows={ownerManagementCompanyRows}
            onOpenFloatPanelClick={
              onOpenTabOwnerManagementCompanyFloatPanelClick
            }
            onSelectedRowChange={
              handleSelectedOwnerManagementCompanyRowChange
            }
          />
        </DetailTabPanel>

        <DetailTabPanel
          active={detailTabValue === 2}
          loaded={loadedDetailTabs.includes(2)}
        >
          <TabInternalOwner
            rows={internalOwnerRows}
            onOpenFloatPanelClick={onOpenTabInternalOwnerFloatPanelClick}
            onSelectedRowChange={handleSelectedInternalOwnerRowChange}
          />
        </DetailTabPanel>

        <DetailTabPanel
          active={detailTabValue === 3}
          loaded={loadedDetailTabs.includes(3)}
        >
          <TabOwner
            rows={ownerRows}
            onOpenFloatPanelClick={onOpenTabOwnerFloatPanelClick}
            onSelectedRowChange={handleSelectedOwnerRowChange}
          />
        </DetailTabPanel>
      </div>

      <TabPropertyManagementCompanyFloatingPanel
        open={isTabPropertyManagementCompanyFloatingPanelOpen}
        onClose={() =>
          setIsTabPropertyManagementCompanyFloatingPanelOpen(false)
        }
        selectedRow={selectedPropertyManagementCompanyRow}
      />

      <TabOwnerManagementCompanyFloatingPanel
        open={isTabOwnerManagementCompanyFloatingPanelOpen}
        onClose={() =>
          setIsTabOwnerManagementCompanyFloatingPanelOpen(false)
        }
        selectedRow={selectedOwnerManagementCompanyRow}
      />

      <TabInternalOwnerFloatingPanel
        open={isTabInternalOwnerFloatingPanelOpen}
        onClose={() => setIsTabInternalOwnerFloatingPanelOpen(false)}
        selectedRow={selectedInternalOwnerRow}
      />

      <TabOwnerFloatingPanel
        open={isTabOwnerFloatingPanelOpen}
        onClose={() => setIsTabOwnerFloatingPanelOpen(false)}
        selectedRow={selectedOwnerRow}
      />

      <LoadingDialog open={isScreenLoading} />
    </div>
  );
}