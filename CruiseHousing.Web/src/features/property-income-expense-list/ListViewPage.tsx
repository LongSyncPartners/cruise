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
import { usePropertyGroups } from "@/hooks/usePropertyGroups";
import { useDefaultPropertyCodeByGroup } from "@/hooks/useDefaultPropertyCodeByGroup";

import ListViewPageHeader from "./view/ListViewPageHeader";

import TabInternalOwner from "./view/tab-internal-owner/TabGrid";
import TabInternalOwnerFloatingPanel from "./view/tab-internal-owner/FloatingPanel";

import TabOwnerManagementCompany from "./view/tab-owner-management-company/TabGrid";
import TabOwnerManagementCompanyFloatingPanel from "./view/tab-owner-management-company/FloatingPanel";

import TabOwner from "./view/tab-owner/TabGrid";
import TabOwnerFloatingPanel from "./view/tab-owner/FloatingPanel";

import TabPropertyManagementCompany from "./view/tab-property-management-company/TabGrid";
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
import { GridCellParams, GridColumnHeaderParams } from "@mui/x-data-grid";
import { EditOpenContext } from "./PropertyIncomeExpenseListScreen";
import { DETAIL_TAB_VALUES, DetailTabValue } from "./subjectOptions";


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

type Props = {
  onOpenEditPage?: (context: EditOpenContext) => void;
};

export default function ListViewPage({ onOpenEditPage  }: Props) {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [detailTabValue, setDetailTabValue] = useState<DetailTabValue>(DETAIL_TAB_VALUES.PROPERTY_MANAGEMENT_COMPANY);
  const [loadedDetailTabs, setLoadedDetailTabs] = useState<DetailTabValue[]>([DETAIL_TAB_VALUES.PROPERTY_MANAGEMENT_COMPANY]);
  const [selectedYearMonth, setSelectedYearMonth] = useState("2026/01");

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

  const { data: groups = [] } = usePropertyGroups();
  const [selectedGroup, setSelectedGroup] = useState<string>("");

  const { data: defaultPropertyCode } =
    useDefaultPropertyCodeByGroup(selectedGroup);

  const yearMonths: string[] = ["2026/01", "2026/02", "2026/03"];

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
    setDetailTabValue(DETAIL_TAB_VALUES.PROPERTY_MANAGEMENT_COMPANY);
    setLoadedDetailTabs([DETAIL_TAB_VALUES.PROPERTY_MANAGEMENT_COMPANY]);
  };

  const handleChangeDetailTab = (newValue: DetailTabValue) => {
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

  const handleGridDoubleClick = (params: GridCellParams | GridColumnHeaderParams) => {
    onOpenEditPage?.({
      detailTabValue: detailTabValue as DetailTabValue,
      subjectTabField: params.field,
    });
  };

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
          active={detailTabValue === DETAIL_TAB_VALUES.PROPERTY_MANAGEMENT_COMPANY}
          loaded={loadedDetailTabs.includes(DETAIL_TAB_VALUES.PROPERTY_MANAGEMENT_COMPANY)}
        >
          <TabPropertyManagementCompany
            rows={propertyManagementCompanyRows}
            onOpenFloatPanelClick={
              onOpenTabPropertyManagementCompanyFloatPanelClick
            }
            onSelectedRowChange={
              handleSelectedPropertyManagementCompanyRowChange
            }
            onGridDoubleClick={handleGridDoubleClick}
          />
        </DetailTabPanel>

        <DetailTabPanel
          active={detailTabValue === DETAIL_TAB_VALUES.OWNER_MANAGEMENT_COMPANY}
          loaded={loadedDetailTabs.includes(DETAIL_TAB_VALUES.OWNER_MANAGEMENT_COMPANY)}
        >
          <TabOwnerManagementCompany
            rows={ownerManagementCompanyRows}
            onOpenFloatPanelClick={
              onOpenTabOwnerManagementCompanyFloatPanelClick
            }
            onSelectedRowChange={
              handleSelectedOwnerManagementCompanyRowChange
            }
            onGridDoubleClick={handleGridDoubleClick}
          />
        </DetailTabPanel>

        <DetailTabPanel
          active={detailTabValue === DETAIL_TAB_VALUES.INTERNAL_OWNER}
          loaded={loadedDetailTabs.includes(DETAIL_TAB_VALUES.INTERNAL_OWNER)}
        >
          <TabInternalOwner
            rows={internalOwnerRows}
            onOpenFloatPanelClick={onOpenTabInternalOwnerFloatPanelClick}
            onSelectedRowChange={handleSelectedInternalOwnerRowChange}
            onGridDoubleClick={handleGridDoubleClick}
          />
        </DetailTabPanel>

        <DetailTabPanel
          active={detailTabValue === DETAIL_TAB_VALUES.OWNER}
          loaded={loadedDetailTabs.includes(DETAIL_TAB_VALUES.OWNER)}
        >
          <TabOwner
            rows={ownerRows}
            onOpenFloatPanelClick={onOpenTabOwnerFloatPanelClick}
            onSelectedRowChange={handleSelectedOwnerRowChange}
            onGridDoubleClick={handleGridDoubleClick}
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