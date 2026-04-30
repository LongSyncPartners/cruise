import { useEffect, useMemo, useState } from "react";
import { Box, Button, MenuItem, Select, Tab, Tabs, Typography } from "@mui/material";

import "./index.style.css";

import LoadingDialog from "../shared/LoadingDialog";
import { usePropertySelectionStore } from "@/stores/propertySelectionStore";
import { usePropertyIncomeExpenseTabs } from "@/hooks/usePropertyIncomeExpenseTabs";
import { usePropertyIncomeExpenseGroups } from "@/hooks/usePropertyIncomeExpenseGroups";
import { useDefaultPropertyCodeByGroup } from "@/hooks/useDefaultPropertyCodeByGroup";
import { PropertyInfo } from "../shared/PropertyInfo";
import { PropertyTabSummary } from "../shared/types";
import { useCenteredScrollableTabs } from "../shared/useCenteredScrollableTabs";

const EMPTY_TABS: PropertyTabSummary[] = [];

export default function ListDownloadPage() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [selectedPropertyNo, setSelectedPropertyNo] = useState<string>("");
  const [selectedRoomNo, setSelectedRoomNo] = useState<string>("");
  const [selectedFileType, setSelectedFileType] = useState<string>("物件別収支一覧");
  const [selectedTargetPeriod, setSelectedTargetPeriod] = useState<string>("2024-2026");

  const selectedPropertyCode = usePropertySelectionStore(
    (state) => state.selectedPropertyCode
  );

  const setSelectedPropertyCode = usePropertySelectionStore(
    (state) => state.setSelectedPropertyCode
  );

  const { data: groups = [] } = usePropertyIncomeExpenseGroups();

  const { data: defaultPropertyCode } =
    useDefaultPropertyCodeByGroup(selectedGroup);

  const {
    data: propertyTabsData,
    isLoading: isTabsLoading,
  } = usePropertyIncomeExpenseTabs(selectedPropertyCode ?? undefined);

  const propertyTabs = propertyTabsData ?? EMPTY_TABS;

  const activeProperty = useMemo<PropertyTabSummary | undefined>(() => {
    return propertyTabs[activeTab];
  }, [propertyTabs, activeTab]);

  const { tabsRootRef, tabRefs } = useCenteredScrollableTabs(activeTab);

  const selectedGroupFromTab =
    propertyTabs?.[activeTab]?.header.propertyCode.charAt(0) || "";

  const propertyNos = useMemo(() => {
    if (propertyTabs.length > 0) {
      return propertyTabs.map((tab) => tab.header.propertyCode);
    }

    return [];
  }, [propertyTabs]);

  const roomNos = useMemo(() => {
    return ["", "101", "102", "201", "202"];
  }, []);

  const fileTypes = useMemo(() => {
    return ["物件別収支一覧", "会計データ"];
  }, []);

  
  const targetPeriods = useMemo(() => {
    return ["2024-2026", "2023-2025", "2022-2024"];
  }, []);

  const handleGroupChange = (newGroup: string) => {
    if (newGroup === selectedGroup) return;

    setSelectedGroup(newGroup);
    setActiveTab(0);
    setSelectedPropertyNo("");
    setSelectedRoomNo("");
  };

  const handleTabChange = (newValue: number) => {
    setActiveTab(newValue);

    const nextPropertyCode = propertyTabs[newValue]?.header.propertyCode;
    if (nextPropertyCode) {
      setSelectedPropertyCode(nextPropertyCode);
      setSelectedPropertyNo(nextPropertyCode);
    }
  };

  const handleDownload = async () => {
    try {
      setLoading(true);

      console.log("download params", {
        group: selectedGroup || selectedGroupFromTab,
        propertyNo: selectedPropertyNo,
        roomNo: selectedRoomNo,
        fileType: selectedFileType,
      });

      // TODO:
      // call download API here
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedGroup && defaultPropertyCode) {
      setSelectedPropertyCode(defaultPropertyCode);
      setSelectedPropertyNo(defaultPropertyCode);
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

  useEffect(() => {
    if (!selectedPropertyNo && propertyTabs.length > 0) {
      const firstPropertyCode = propertyTabs[activeTab]?.header.propertyCode ?? "";
      setSelectedPropertyNo(firstPropertyCode);
    }
  }, [propertyTabs, activeTab, selectedPropertyNo]);

  const isScreenLoading = loading || isTabsLoading;

  return (
    <div>
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
          value={selectedGroup || selectedGroupFromTab}
          onChange={(e) => handleGroupChange(e.target.value as string)}
          sx={{ minWidth: 60, ml: 1 }}
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
          onChange={(_event, newValue: number) => handleTabChange(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{ minHeight: 48, flex: 1, ml: 2 }}
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

      {activeProperty?.header && (
        <PropertyInfo {...activeProperty.header} />
    )}

    <Box sx={{ px: 2, py: 2 }}>
        <Typography sx={{ mb: 2, fontWeight: 600 }}>
            ダウンロード条件
        </Typography>

        <Box
        sx={{
        display: "inline-flex",
        flexDirection: "column",
        gap: 2,
        }}
        >
            {/* Row 1 */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography sx={{ minWidth: 90 }}>物件グループ</Typography>
            <Select
                size="small"
                value={selectedGroup || selectedGroupFromTab}
                onChange={(e) => handleGroupChange(e.target.value as string)}
                sx={{ minWidth: 100 }}
            >
                {groups.map((group) => (
                <MenuItem key={group} value={group}>
                    {group}
                </MenuItem>
                ))}
            </Select>

            <Typography>物件番号</Typography>
            <Select
                size="small"
                value={selectedPropertyNo}
                onChange={(e) => setSelectedPropertyNo(e.target.value)}
                sx={{ minWidth: 100 }}
            >
                {propertyNos.map((item) => (
                <MenuItem key={item} value={item}>
                    {item}
                </MenuItem>
                ))}
            </Select>

            <Typography>部屋番号</Typography>
            <Select
                size="small"
                value={selectedRoomNo}
                onChange={(e) => setSelectedRoomNo(e.target.value)}
                sx={{ minWidth: 100 }}
            >
                {roomNos.map((item) => (
                <MenuItem key={item} value={item}>
                    {item || " "}
                </MenuItem>
                ))}
            </Select>
            </Box>

            {/* Row 2 */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography sx={{ minWidth: 90 }}>ファイル</Typography>
            <Select
                size="small"
                value={selectedFileType}
                onChange={(e) => setSelectedFileType(e.target.value)}
                sx={{ minWidth: 200 }}
            >
                {fileTypes.map((item) => (
                <MenuItem key={item} value={item}>
                    {item}
                </MenuItem>
                ))}
            </Select>

            <Typography>対象期間</Typography>
            <Select
                size="small"
                value={selectedTargetPeriod}
                onChange={(e) => setSelectedTargetPeriod(e.target.value)}
                sx={{ minWidth: 200 }}
            >
                {targetPeriods.map((item) => (
                <MenuItem key={item} value={item}>
                    {item}
                </MenuItem>
                ))}
            </Select>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginTop: 2 }}>
              <Typography sx={{ minWidth: 90 }}/>
              <Button
                variant="contained"
                color="success"
                onClick={handleDownload}
                sx={{ minWidth: 140 }}
            >
                ダウンロード
            </Button>
            </Box>
        </Box>
    </Box>

      <LoadingDialog open={isScreenLoading} />
    </div>
  );
}