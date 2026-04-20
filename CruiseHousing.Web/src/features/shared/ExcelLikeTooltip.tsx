import React from "react";
import { styled, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";

const ExcelLikeTooltipRoot = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#fff8c6",
    color: "#222",
    border: "1px solid #b7b7b7",
    borderRadius: 2,
    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
    fontSize: 12,
    padding: "4px 8px",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "#fff8c6",
  },
  [`& .${tooltipClasses.arrow}::before`]: {
    border: "1px solid #b7b7b7",
    boxSizing: "border-box",
  },
}));

export default function ExcelLikeTooltip(props: TooltipProps) {
  return <ExcelLikeTooltipRoot {...props} />;
}