import { Theme } from "@mui/material/styles";
import { SystemStyleObject } from "@mui/system";

export const dataGridCommonSx: SystemStyleObject<Theme> = {
  "& .MuiDataGrid-cell": {
    whiteSpace: "normal",
    wordBreak: "break-word",
    lineHeight: "1",
    alignItems: "center",
    display: "flex",
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    whiteSpace: "normal",
    lineHeight: 1,
  },
  "& .MuiDataGrid-editInputCell": {
    alignItems: "flex-start",
  },
  "& .MuiDataGrid-sortIcon": {
    display: "none",
  },
  "& .MuiDataGrid-sortButton": {
    display: "none",
  },
  "& .MuiDataGrid-columnHeader": {
    paddingLeft : "0px"
  },
   "& .MuiDataGrid-row:hover": {
      backgroundColor: "color-mix(in srgb, var(--DataGrid-t-color-background-base), var(--DataGrid-t-color-interactive-selected) calc(var(--DataGrid-t-color-interactive-selected-opacity) * 100%))",
  },
  "& .MuiDataGrid-row": {
    minHeight: "40px !important",
  },
  "& .MuiDataGrid-row:hover .sticky-col": {
    backgroundColor: "#eaeff5",
  },

  "& .Mui-selected .sticky-col": {
    backgroundColor: "var(--DataGrid-rowSelectedBackgroundColor)",
  },

  "& .Mui-selected:hover .sticky-col": {
    backgroundColor:
      "var(--DataGrid-rowSelectedHoverBackgroundColor)",
  },
  
};