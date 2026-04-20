import * as React from "react";
import type {
  GridColDef,
  GridFilterItem,
  GridFilterModel,
  GridFilterOperator,
  GridSortModel,
  ValueOptions,
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

type SelectOption = {
  value: string;
  label: string;
};

type SingleSelectColDefLike = {
  type?: string;
  valueOptions?: ValueOptions[];
};

function normalizeValueOptions(valueOptions?: ValueOptions[]): SelectOption[] {
  if (!valueOptions) return [];

  return valueOptions.map((option) => {
    if (
      typeof option === "object" &&
      option !== null &&
      "value" in option
    ) {
      const value = String(option.value ?? "");
      const label =
        "label" in option
          ? String(option.label ?? option.value ?? "")
          : value;

      return { value, label };
    }

    return {
      value: String(option),
      label: String(option),
    };
  });
}

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
    const operator = "contains";

    const colDef = params.colDef as SingleSelectColDefLike;
    const isSingleSelect = colDef.type === "singleSelect";
    const valueOptions = isSingleSelect
      ? normalizeValueOptions(colDef.valueOptions)
      : [];

    return (
      <HeaderFilterCell
        label={label}
        value={getFilterValue(filterModel, field)}
        sortDirection={getSortDirection(sortModel, field) ?? null}
        debounceMs={debounceMs}
        filterType={isSingleSelect ? "select" : "text"}
        options={valueOptions}
        onChange={(nextValue) => {
          setFilterModel((prev) =>
            upsertContainsFilter(prev, field, nextValue, operator)
          );
        }}
        onSort={() => {
          setSortModel((prev) => toggleSortModel(prev, field));
        }}
      />
    );
  };
}

export const singleSelectContainsOperator: GridFilterOperator = {
  label: "contains",
  value: "contains",
  getApplyFilterFn: (filterItem: GridFilterItem) => {
    const filterValue = String(filterItem.value ?? "").trim().toLowerCase();

    if (!filterValue) {
      return null;
    }

    return (cellValue) => {
      const value = String(cellValue ?? "").toLowerCase();
      return value.includes(filterValue);
    };
  },
};