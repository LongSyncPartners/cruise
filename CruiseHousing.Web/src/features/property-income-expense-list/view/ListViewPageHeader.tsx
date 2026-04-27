import { Box, MenuItem, Select, Tab, Tabs, Typography } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";

import type { PropertyInfoProps } from "../types";
import { PropertyInfo } from "../../shared/PropertyInfo";
import { PropertyTabSummary } from "../../shared/types";
import { useCenteredScrollableTabs } from "@/features/shared/useCenteredScrollableTabs";

const getDetailTabProps = (index: number) => ({
  id: `property-tab-${index}`,
  "aria-controls": `property-tabpanel-${index}`,
});

type ListViewPageHeaderProps = {
  groups: string[];
  onGroupChange: (newGroup: string) => void;
  activeTab: number;
  propertyTabs: PropertyTabSummary[];
  onChangePropertyTab: (newValue: number) => void;

  header?: PropertyInfoProps;

  selectedYearMonth: string;
  yearMonths: string[];
  onYearMonthChange: (value: string) => void;

  detailTabValue: number;
  onChangeDetailTab: (newValue: number) => void;
};

export default function ListViewPageHeader({
  groups,
  onGroupChange,
  activeTab,
  propertyTabs,
  onChangePropertyTab,
  header,
  selectedYearMonth,
  yearMonths,
  onYearMonthChange,
  detailTabValue,
  onChangeDetailTab,
}: ListViewPageHeaderProps) {
  const { tabsRootRef, tabRefs } = useCenteredScrollableTabs(activeTab);

  const selectedGroup =
    propertyTabs?.[activeTab]?.header.propertyCode.charAt(0) || "";

  const handleYearMonthChange = (event: SelectChangeEvent) => {
    onYearMonthChange(event.target.value);
  };

  return (
    <>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
        }}
      >
        物件グループ：
        <Select
          size="small"
          value={selectedGroup}
          onChange={(e) => {
            const group = e.target.value as string;
            onGroupChange(group);
          }}
          sx={{ minWidth: 60 }}
        >
          {groups.map((g) => (
            <MenuItem key={g} value={g}>
              {g}
            </MenuItem>
          ))}
        </Select>

        <Tabs
          ref={tabsRootRef}
          value={activeTab}
          onChange={(_event, newValue: number) => onChangePropertyTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          aria-label="Property income expense tabs"
          sx={{ minHeight: 48, flex: 1 }}
        >
          {propertyTabs.map((propertyTab, index) => (
            <Tab
              key={propertyTab.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              label={propertyTab.header.propertyCode}
              sx={{
                textTransform: "none",
                whiteSpace: "nowrap",
                minWidth: 60,
                maxWidth: 80,
                px: 1,
                "&.Mui-selected": {
                  backgroundColor: "#1976d2",
                  color: "white",
                },
              }}
              disableRipple
            />
          ))}
        </Tabs>
      </Box>

      {header && <PropertyInfo {...header} />}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0,
            pl: 1,
            minWidth: 120,
          }}
        >

          <Select
            size="small"
            value={selectedYearMonth}
            onChange={handleYearMonthChange}
            sx={{ minWidth: 100 }}
          >
            {yearMonths.map((yearMonth) => (
              <MenuItem key={yearMonth} value={yearMonth}>
                {yearMonth}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Tabs
          value={detailTabValue}
          onChange={(_event, newValue: number) => onChangeDetailTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ flex: 1 }}
        >
          <Tab
            label="物件管理会社"
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#1976d2",
                color: "white",
              },
            }}
            {...getDetailTabProps(0)}
          />
          <Tab
            label="オーナー管理会社"
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#1976d2",
                color: "white",
              },
            }}
            {...getDetailTabProps(1)}
          />
          <Tab
            label="貸主（自社）"
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#1976d2",
                color: "white",
              },
            }}
            {...getDetailTabProps(2)}
          />
          <Tab
            label="オーナー"
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#1976d2",
                color: "white",
              },
            }}
            {...getDetailTabProps(3)}
          />
        </Tabs>
      </Box>
    </>
  );
}