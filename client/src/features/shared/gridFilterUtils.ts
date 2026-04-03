import {
  GridFilterItem,
  GridFilterModel,
  GridSortDirection,
  GridSortModel,
} from "@mui/x-data-grid";

export function upsertContainsFilter(
  currentModel: GridFilterModel,
  field: string,
  value: string,
  operator: string = "contains"
): GridFilterModel {
  const otherItems = currentModel.items.filter((item) => item.field !== field);

  if (!value.trim()) {
    return {
      ...currentModel,
      items: [],
    };
  }

  const newItem: GridFilterItem = {
    id: field,
    field,
    operator,
    value,
  };

  return {
    ...currentModel,
    items: [...otherItems, newItem],
  };
}

export function getFilterValue(
  currentModel: GridFilterModel,
  field: string
): string {
  const item = currentModel.items.find((x) => x.field === field);
  return typeof item?.value === "string" ? item.value : "";
}

export function getSortDirection(
  sortModel: GridSortModel,
  field: string
): GridSortDirection | undefined {
  return sortModel.find((x) => x.field === field)?.sort;
}

export function toggleSortModel(
  currentSortModel: GridSortModel,
  field: string
): GridSortModel {
  const current = currentSortModel.find((x) => x.field === field)?.sort;

  if (!current) {
    return [{ field, sort: "asc" }];
  }

  if (current === "asc") {
    return [{ field, sort: "desc" }];
  }

  return [];
}