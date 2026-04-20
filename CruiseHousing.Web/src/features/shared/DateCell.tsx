import React from "react";
import { GridRenderCellParams } from "@mui/x-data-grid";

const formatDate = (value: unknown): string => {
  if (!value) return "";

  const date = new Date(value as string | number);
  if (isNaN(date.getTime())) return "";

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  return `${yyyy}/${mm}/${dd}`;
};

export default function DateCell(
  params: GridRenderCellParams
) {
  return <span>{formatDate(params.value)}</span>;
}