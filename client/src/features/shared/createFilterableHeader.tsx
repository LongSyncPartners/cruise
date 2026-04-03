import * as React from "react";
import type {
  GridColDef,
  GridFilterModel,
  GridSortModel,
} from "@mui/x-data-grid";
import HeaderFilterCell from "./HeaderFilterCell";
import {
  getFilterValue,
  getSortDirection,
  toggleSortModel,
  upsertContainsFilter,
} from "./gridFilterUtils";

type CreateFilterableHeaderParams = {
  filterModel: GridFilterModel;
  setFilterModel: React.Dispatch<React.SetStateAction<GridFilterModel>>;
  sortModel: GridSortModel;
  setSortModel: React.Dispatch<React.SetStateAction<GridSortModel>>;
  debounceMs?: number;
};

export function createFilterableHeader({
  filterModel,
  setFilterModel,
  sortModel,
  setSortModel,
  debounceMs = 300,
}: CreateFilterableHeaderParams): GridColDef["renderHeader"] {
  return (params) => {
    const field = params.field;
    const label = params.colDef.headerName ?? field;

    const operator =
      params.colDef.type === "singleSelect" ? "is" : "contains";

    return (
      <HeaderFilterCell
        label={label}
        value={getFilterValue(filterModel, field)}
        sortDirection={getSortDirection(sortModel, field) ?? null}
        debounceMs={debounceMs}
        onChange={(nextValue) => {
          setFilterModel((prev) => upsertContainsFilter(prev, field, nextValue, operator));
        }}
        onSort={() => {
          setSortModel((prev) => {
                const next = toggleSortModel(prev, field);
                return next;
            });
        }}
      />
    );
  };
}