import { useState } from "react";
import { Typography } from "@mui/material";
import PropertyIncomeExpenseSummaryHeader from "./PropertyIncomeExpenseSummaryHeader";
import PropertyIncomeExpenseSummaryGrid from "./PropertyIncomeExpenseSummaryGrid";
import { getManagementCompanies, getPropertyIncomeExpenseSummaryRows, getTabs, getYears } from "./data.dump";
import "./index.style.css";


export default function PropertyIncomeExpenseSummaryPage() {
  
  const managementCompanies = getManagementCompanies();
  const [selectedManagementCompany, setSelectedManagementCompany] =
    useState<string>(managementCompanies[0]);

  const years = getYears();
  const [selectedYear, setSelectedYear] = useState<number>(2026);

  const tabs = getTabs();

  const handleClickPrev = () => {
    console.log("click prev");
  };

  const handleClickNext = () => {
    console.log("click next");
  };

  const rows = getPropertyIncomeExpenseSummaryRows(selectedYear);

  return (
    <div>
      <Typography sx={{ fontSize: "150%", fontWeight: "500", pb: 2 }}>
        管理会社別サマリー
      </Typography>

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
      <PropertyIncomeExpenseSummaryGrid
        rows={rows}
      />
      </div>
    </div>
  );
}