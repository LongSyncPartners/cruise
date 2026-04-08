import { Box, Tab, Tabs } from "@mui/material";
import { type PropertyTabData } from "./types";
import { useCenteredScrollableTabs } from "./useCenteredScrollableTabs";

type PropertyIncomeExpenseTabsProps = {
  activeTab: number;
  propertyTabs: PropertyTabData[];
  onChange: (newValue: number) => void;
};

export default function PropertyIncomeExpenseTabs({
  activeTab,
  propertyTabs,
  onChange,
}: PropertyIncomeExpenseTabsProps) {
  const { tabsRootRef, tabRefs } = useCenteredScrollableTabs(activeTab);

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        mb: 2,
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Box sx={{ px: 0, whiteSpace: "nowrap", flexShrink: 0 }}>
        物件グループ：C
      </Box>

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