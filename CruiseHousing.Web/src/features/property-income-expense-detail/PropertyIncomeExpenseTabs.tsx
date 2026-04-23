import { Box, MenuItem, Select, Tab, Tabs } from "@mui/material";
import { PropertyTabSummary } from "../shared/commonTypes";
import { useCenteredScrollableTabs } from "../shared/useCenteredScrollableTabs";

type PropertyIncomeExpenseTabsProps = {
  groups: string[];
  onGroupChange: (newGroup: string) => void;
  activeTab: number;
  propertyTabs: PropertyTabSummary[];
  onChange: (newValue: number) => void;
};

export default function PropertyIncomeExpenseTabs({
  groups,
  onGroupChange,
  activeTab,
  propertyTabs,
  onChange,
}: PropertyIncomeExpenseTabsProps) {
  const { tabsRootRef, tabRefs } = useCenteredScrollableTabs(activeTab);
  const selectedGroup =
    propertyTabs?.[activeTab]?.header.propertyCode.charAt(0) || "";

  return (
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
        onChange={(_event, newValue: number) => onChange(newValue)}
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
  );
}