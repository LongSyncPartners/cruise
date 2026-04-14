import React from "react";
import { Box, Tooltip } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { formatUSD } from "./utils";
import ExcelLikeTooltip from "./ExcelLikeTooltip";

export default function CurrencyCell(params: GridRenderCellParams) {
  const value = Number(params.value ?? 0);
  const formattedValue = formatUSD(value);

  const tooltipText =
    typeof params.row.managementCompanyAmountTooltip === "string"
      ? params.row.managementCompanyAmountTooltip
      : "";

  const hasTooltip = tooltipText.trim().length > 0;

  const content = (
    <Box
      component="span"
      sx={{
        position: "relative",
        display: "inline-block",
        width: "100%",
        color: value < 0 ? "red" : "inherit",
        pr: hasTooltip ? 1.5 : 0,
        "&::after": hasTooltip
          ? {
              content: '""',
              position: "absolute",
              top: 0,
              right: 0,
              width: 0,
              height: 0,
              borderTop: "8px solid red",
              borderLeft: "8px solid transparent",
            }
          : undefined,
      }}
    >
      {formattedValue}
    </Box>
  );

  if (!hasTooltip) {
    return content;
  }

  return (
    <ExcelLikeTooltip title={tooltipText} placement="top">
      {content}
    </ExcelLikeTooltip>
  );
}