import { Box, MenuItem, Select, Tab, Tabs } from "@mui/material";

import type { PropertyInfoProps, SubjectTabInfo } from "../types";
import { PropertyInfo } from "../../shared/PropertyInfo";
import { useCenteredScrollableTabs } from "@/features/shared/useCenteredScrollableTabs";
import { PropertyTabSummary } from "@/features/shared/commonTypes";

const getDetailTabProps = (index: number) => ({
  id: `property-tab-${index}`,
  "aria-controls": `property-tabpanel-${index}`,
});

const getSubjectTabProps = (index: number) => ({
  id: `subject-tab-${index}`,
  "aria-controls": `subject-tabpanel-${index}`,
});

type ListEditPageHeaderProps = {
  groups: string[];
  onGroupChange: (newGroup: string) => void;
  activeTab: number;
  propertyTabs: PropertyTabSummary[];
  onChangePropertyTab: (newValue: number) => void;

  header?: PropertyInfoProps;

  detailTabValue: number;
  onChangeDetailTab: (newValue: number) => void;

  subjectTabValue: number;
  subjectTabs: SubjectTabInfo[];
  onChangeSubjectTab: (newValue: number) => void;
};

export default function ListEditPageHeader({
  groups,
  onGroupChange,
  activeTab,
  propertyTabs,
  onChangePropertyTab,
  header,
  detailTabValue,
  onChangeDetailTab,
  subjectTabValue,
  subjectTabs,
  onChangeSubjectTab,
}: ListEditPageHeaderProps) {
  const { tabsRootRef, tabRefs } = useCenteredScrollableTabs(activeTab);

  const selectedGroup =
    propertyTabs?.[activeTab]?.header.propertyCode.charAt(0) || "";

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
          sx={{ flex: 1 }}
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
                minHeight: 30,
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
        <Tabs
          value={detailTabValue}
          onChange={(_event, newValue: number) => onChangeDetailTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ flex: 1 }}
        >
          <Tab
            label="全て"
            sx={{
              textTransform: "none",
                whiteSpace: "nowrap",
                minWidth: 100,
                minHeight: 30,
                px: 1,
                "&.Mui-selected": {
                  backgroundColor: "#1976d2",
                  color: "white",
                },
            }}
            {...getDetailTabProps(0)}
          />
          <Tab
            label="物件管理会社"
            sx={{
              textTransform: "none",
                whiteSpace: "nowrap",
                minWidth: 120,
                minHeight: 30,
                px: 1,
                "&.Mui-selected": {
                  backgroundColor: "#1976d2",
                  color: "white",
                },
            }}
            {...getDetailTabProps(1)}
          />
          <Tab
            label="オーナー管理会社"
            sx={{
              textTransform: "none",
                whiteSpace: "nowrap",
                minWidth: 120,
                minHeight: 30,
                px: 1,
                "&.Mui-selected": {
                  backgroundColor: "#1976d2",
                  color: "white",
                },
            }}
            {...getDetailTabProps(2)}
          />
          <Tab
            label="貸主（自社）"
            sx={{
              textTransform: "none",
                whiteSpace: "nowrap",
                minWidth: 100,
                minHeight: 30,
                px: 1,
                "&.Mui-selected": {
                  backgroundColor: "#1976d2",
                  color: "white",
                },
            }}
            {...getDetailTabProps(3)}
          />
          <Tab
            label="オーナー"
            sx={{
              textTransform: "none",
                whiteSpace: "nowrap",
                minWidth: 100,
                minHeight: 30,
                px: 1,
                "&.Mui-selected": {
                  backgroundColor: "#1976d2",
                  color: "white",
                },
            }}
            {...getDetailTabProps(4)}
          />
        </Tabs>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          borderBottom: 1,
          borderColor: "divider",
          paddingTop:2
        }}
      >

        <Tabs
          value={subjectTabValue}
          onChange={(_event, newValue: number) => onChangeSubjectTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ flex: 1 }}
        >
          {subjectTabs.map((subjectTab, index) => (
            <Tab
              key={subjectTab.code}
              label={subjectTab.label}
              sx={{
                textTransform: "none",
                whiteSpace: "nowrap",
                minWidth: 100,
                minHeight: 30,
                px: 1,
                "&.Mui-selected": {
                  backgroundColor: "#1976d2",
                  color: "white",
                },
              }}
              {...getSubjectTabProps(index)}
            />
          ))}
        </Tabs>
      </Box>
    </>
  );
}