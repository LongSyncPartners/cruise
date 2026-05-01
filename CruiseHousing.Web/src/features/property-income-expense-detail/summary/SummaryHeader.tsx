import {
  Box,
  MenuItem,
  Select,
  Typography,
  IconButton,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useRef } from "react";
import { PropertyIncomeExpenseSummaryHeaderProps } from "../types";

export default function PropertyIncomeExpenseSummaryHeader({
    managementCompanies,
    selectedManagementCompany,
    onManagementCompanyChange,
    years,
    selectedYear,
    onYearChange,
    tabs,
    onClickPrev,
    onClickNext,
}: PropertyIncomeExpenseSummaryHeaderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScrollPrev = () => {
    scrollRef.current?.scrollBy({
      left: -350,
      behavior: "smooth",
    });
    
    onClickPrev();
  };

  const handleScrollNext = () => {
    scrollRef.current?.scrollBy({
      left: 350,
      behavior: "smooth",
    });
    onClickNext();
  };


  return (
    <Box sx={{ }}>
      {/* Row 1 */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography>管理会社：</Typography>
        <Select
          size="small"
          value={selectedManagementCompany}
          onChange={(e) => onManagementCompanyChange(e.target.value as string)}
          sx={{ minWidth: 220, marginRight: 2 }}
        >
          {managementCompanies.map((mc) => (
            <MenuItem key={mc} value={mc}>
              {mc}
            </MenuItem>
          ))}
        </Select>

        <Typography>年：</Typography>
        <Select
          size="small"
          value={selectedYear}
          onChange={(e) => onYearChange(Number(e.target.value))}
          sx={{ minWidth: 100 }}
        >
          {years.map((y) => (
            <MenuItem key={y} value={y}>
              {y}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Row 2 */}
        <Box
        sx={{
            display: "flex",
            alignItems: "center",
        }}
        >
        {/* 全物件計 */}
        <Box
            sx={{
            flex: "0 0 33.333%",
            textAlign: "center",
            whiteSpace: "nowrap",
            }}
        >
            全物件計
        </Box>

        {/* Scroll Left */}
        <IconButton size="small" onClick={handleScrollPrev}>
            <ChevronLeftIcon />
        </IconButton>

        {/* Tabs */}
        <Box
            ref={scrollRef}
            sx={{
            display: "flex",
            overflowX: "auto",
            flex: 1,
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
                display: "none",
            },
            }}
        >
            {tabs.map((tab, index) => (
            <Box
                key={index}
                sx={{
                flex: "0 0 50%",
                textAlign: "center",
                px: 0,
                py: 0,
                whiteSpace: "nowrap",
                pointerEvents: "none",
                }}
            >
                物件グループ：{tab}
            </Box>
            ))}
        </Box>

        {/* Scroll Right */}
        <IconButton size="small" onClick={handleScrollNext}>
            <ChevronRightIcon />
        </IconButton>
        </Box>
    </Box>
  );
}