import { useEffect, useMemo, useState } from "react";

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

import TabInternalOwner from "./view/TabInternalOwner";
import TabOwner from "./view/TabOwner";
import TabOwnerManagementCompany from "./view/TabOwnerManagementCompany";
import TabPropertyManagementCompany from "./view/TabPropertyManagementCompany";

import {
  createTabInternalOwnerRows,
  createTabOwnerManagementCompanyRows,
  createTabOwnerRows,
  createTabPropertyManagementCompanyRows,
} from "./data.dump2";
import { PropertyTabSummary } from "../shared/commonTypes";
import { PropertyIncomeExpenseDetailRow } from "../property-income-expense-detail/types";

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
    <div
      role="tabpanel"
      style={{ display: active ? "block" : "none" }}
    >
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
  const [selectedYearMonth, setSelectedYearMonth] = useState("202604");


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

  const yearMonths: string[] = ["202604", "202605"];

  // 4 tab rows 
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

  const handleGroupChange = async (newGroup: string) => {
    if (newGroup === selectedGroup) return;

    setSelectedGroup(newGroup);
    setActiveTab(0);
    setDetailTabValue(0);
    setLoadedDetailTabs([0]);
  };

  const handleChangeDetailTab = (newValue: number) => {
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

      <DetailTabPanel
        active={detailTabValue === 0}
        loaded={loadedDetailTabs.includes(0)}
      >
        <TabPropertyManagementCompany rows={propertyManagementCompanyRows} />
      </DetailTabPanel>

      <DetailTabPanel
        active={detailTabValue === 1}
        loaded={loadedDetailTabs.includes(1)}
      >
        <TabOwnerManagementCompany rows={ownerManagementCompanyRows} />
      </DetailTabPanel>

      <DetailTabPanel
        active={detailTabValue === 2}
        loaded={loadedDetailTabs.includes(2)}
      >
        <TabInternalOwner rows={internalOwnerRows} />
      </DetailTabPanel>

      <DetailTabPanel
        active={detailTabValue === 3}
        loaded={loadedDetailTabs.includes(3)}
      >
        <TabOwner rows={ownerRows} />
      </DetailTabPanel>

      <LoadingDialog open={isScreenLoading} />
    </div>
  );
}