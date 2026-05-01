import { useEffect, useMemo, useState } from "react";

import "./index.style.css";
import { useManagementCompanies } from "@/hooks/useManagementCompanies";
import { usePropertyGroupsByCompanyCode } from "@/hooks/usePropertyGroupsByCompanyCode";
import { usePropertyIncomeExpenseSummaryRows } from "@/hooks/usePropertyIncomeExpenseSummaryRows";
import LoadingDialog from "../shared/LoadingDialog";

import {
  buildSummaryRows,
  getVisibleGroups,
  getYears,
} from "./summary/useSummaryPage";

import PropertyIncomeExpenseSummaryHeader from "./summary/SummaryHeader";
import PropertyIncomeExpenseSummaryGrid from "./summary/SummaryGrid";

export default function SummaryPage() {
  /**
   * 1. Master data
   */
  const years = getYears();

  const {
    data: managementCompanies = [],
    isLoading: isManagementCompaniesLoading,
  } = useManagementCompanies();

  /**
   * 2. Selected state
   */
  const [selectedManagementCompany, setSelectedManagementCompany] =
    useState<string>("");

  const [selectedYear, setSelectedYear] = useState<number>(
    years[0] || new Date().getFullYear()
  );

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  /**
   * Set default company (first item)
   */
  useEffect(() => {
    if (managementCompanies.length === 0) return;

    setSelectedManagementCompany((prev) => prev || managementCompanies[0]);
  }, [managementCompanies]);

  /**
   * 3. Fetch propertyGroup (tabs) by company
   */
  const {
    data: tabs = [],
    isLoading: isTabsLoading,
  } = usePropertyGroupsByCompanyCode(
    selectedManagementCompany);

  /**
   * 4. Fetch summaryItems
   */
  const {
    data: summaryItems = [],
    isLoading: isRowsLoading,
  } = usePropertyIncomeExpenseSummaryRows(
    selectedManagementCompany,
    selectedYear
  );

  /**
   * 5. Visible groups (2 tabs at once)
   */
  const visibleGroups = useMemo(() => {
    return getVisibleGroups(tabs, activeTabIndex);
  }, [tabs, activeTabIndex]);

  /**
   * 5. Build rows
   */
  const rows = useMemo(() => {
    return buildSummaryRows(
      summaryItems,
      visibleGroups.propertyGroup1,
      visibleGroups.propertyGroup2
    );
  }, [summaryItems, visibleGroups]);

  /**
   * Reset tab when company or year changes
   */
  useEffect(() => {
    setActiveTabIndex(0);
  }, [selectedManagementCompany, selectedYear]);

  /**
   * Keep activeTabIndex valid
   */
  useEffect(() => {
    const maxIndex = Math.max(0, tabs.length - 2);

    if (activeTabIndex > maxIndex) {
      setActiveTabIndex(maxIndex);
    }
  }, [activeTabIndex, tabs.length]);

  /**
   * Tab navigation
   */
  const handleClickPrev = () => {
    setActiveTabIndex((prev) => Math.max(0, prev - 1));
  };

  const handleClickNext = () => {
    const maxIndex = Math.max(0, tabs.length - 2);
    setActiveTabIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  /**
   * Loading state
   */
  const isScreenLoading =
    isManagementCompaniesLoading || isTabsLoading || isRowsLoading;

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