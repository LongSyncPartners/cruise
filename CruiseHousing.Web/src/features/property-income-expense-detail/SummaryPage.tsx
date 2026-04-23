import { useEffect, useMemo, useState } from "react";

import "./index.style.css";
import { useManagementCompanies } from "@/hooks/useManagementCompanies";
import { usePropertyIncomeExpenseSummaryTabs } from "@/hooks/usePropertyIncomeExpenseSummaryTabs";
import { usePropertyIncomeExpenseSummaryRows } from "@/hooks/usePropertyIncomeExpenseSummaryRows";
import LoadingDialog from "../shared/LoadingDialog";

import {
  buildSummaryRows,
  extractPropertyGroups,
  getVisibleGroups,
  getYears,
} from "./summary/useSummaryPage";
import PropertyIncomeExpenseSummaryHeader from "./summary/SummaryHeader";
import PropertyIncomeExpenseSummaryGrid from "./summary/SummaryGrid";

export default function SummaryPage() {
  const years = getYears();

  const {
    data: managementCompanies = [],
    isLoading: isManagementCompaniesLoading,
  } = useManagementCompanies();

  const [selectedManagementCompany, setSelectedManagementCompany] =
    useState<string>("");

  const [selectedYear, setSelectedYear] = useState<number>(
    years[0] || new Date().getFullYear()
  );

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const {
    data: fetchedTabs = [],
    isLoading: isTabsLoading,
  } = usePropertyIncomeExpenseSummaryTabs(selectedManagementCompany);

  const {
    data: summaryItems = [],
    isLoading: isRowsLoading,
  } = usePropertyIncomeExpenseSummaryRows(
    selectedManagementCompany,
    selectedYear
  );

  /**
   * Use tabs from API if available.
   * Otherwise fallback to extracted property groups from row items.
   */
  const tabs = useMemo(() => {
    if (fetchedTabs.length > 0) {
      return fetchedTabs;
    }

    return extractPropertyGroups(summaryItems);
  }, [fetchedTabs, summaryItems]);

  const visibleGroups = useMemo(() => {
    return getVisibleGroups(tabs, activeTabIndex);
  }, [tabs, activeTabIndex]);

  const rows = useMemo(() => {
    return buildSummaryRows(
      summaryItems,
      visibleGroups.propertyGroup1,
      visibleGroups.propertyGroup2
    );
  }, [summaryItems, visibleGroups]);

  const handleClickPrev = () => {
    setActiveTabIndex((prev) => Math.max(0, prev - 1));
  };

  const handleClickNext = () => {
    const maxIndex = Math.max(0, tabs.length - 2);
    setActiveTabIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const isScreenLoading =
    isManagementCompaniesLoading || isTabsLoading || isRowsLoading;

  /**
   * Reset active tab when management company / year changes.
   */
  useEffect(() => {
    setActiveTabIndex(0);
  }, [selectedManagementCompany, selectedYear]);

  /**
   * Keep activeTabIndex within valid range.
   * Since 2 group columns are shown at once,
   * the last valid start index is tabs.length - 2.
   */
  useEffect(() => {
    const maxIndex = Math.max(0, tabs.length - 2);

    if (activeTabIndex > maxIndex) {
      setActiveTabIndex(maxIndex);
    }
  }, [activeTabIndex, tabs.length]);

    /**
   * Set default selected management company
   * after management company list is loaded.
   */
  useEffect(() => {
    if (managementCompanies.length === 0) return;

    setSelectedManagementCompany((prev) => prev || managementCompanies[0]);
  }, [managementCompanies]);

  return (
    <div>
      <PropertyIncomeExpenseSummaryHeader
        managementCompanies={managementCompanies}
        selectedManagementCompany={selectedManagementCompany}
        onManagementCompanyChange={setSelectedManagementCompany}
        years={years}
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
        tabs={tabs}
        onClickPrev={handleClickPrev}
        onClickNext={handleClickNext}
      />

      <div className="property-income-expense-detail-grid-contaniner">
        <PropertyIncomeExpenseSummaryGrid rows={rows} />
      </div>

      <LoadingDialog open={isScreenLoading} />
    </div>
  );
}