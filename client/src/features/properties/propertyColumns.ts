import type { GridColDef } from "@mui/x-data-grid";
import type { PropertyRow } from "./types";

import {
  MANAGEMENT_TYPE_OPTIONS,
  PROCESSING_STATUS_OPTIONS,
  PROPERTY_STATUS_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
} from "./property";

import { singleSelectContainsOperator } from "../shared/createFilterableHeader";
import { getPreviousMonthLabel } from "../shared/utils";
import {
  PROPERTY_COLUMN_SOURCES,
  type PropertyColumnSource,
} from "./data.dump";

export type PropertyColumnConfig = {
  field: string;
  headerName: string;
  dataSource?: string;
  visible?: boolean;
};

type Params = {
  renderFilterableHeader: GridColDef["renderHeader"];
  columnConfigs?: PropertyColumnConfig[];
};

const buildBaseColumnMap = (
  renderFilterableHeader: GridColDef["renderHeader"]
): Record<string, GridColDef<PropertyRow>> => ({
  propertyCode: {
    field: "propertyCode",
    headerName: "物件番号",
    width: 90,
    editable: false,
    sortable: false,
    filterable: false,
    renderHeader: renderFilterableHeader,
  },
  managementType: {
    field: "managementType",
    headerName: "管理種別",
    width: 100,
    editable: false,
    sortable: false,
    filterable: false,
    type: "singleSelect",
    valueOptions: MANAGEMENT_TYPE_OPTIONS,
    filterOperators: [singleSelectContainsOperator],
    renderHeader: renderFilterableHeader,
  },
  propertyType: {
    field: "propertyType",
    headerName: "建物種別",
    width: 100,
    editable: false,
    sortable: false,
    filterable: false,
    type: "singleSelect",
    valueOptions: PROPERTY_TYPE_OPTIONS,
    filterOperators: [singleSelectContainsOperator],
    renderHeader: renderFilterableHeader,
  },
  managementCompany: {
    field: "managementCompany",
    headerName: "管理会社",
    width: 160,
    editable: false,
    sortable: false,
    filterable: false,
    renderHeader: renderFilterableHeader,
  },
  managementStartDate: {
    field: "managementStartDate",
    headerName: "管理開始日",
    width: 130,
    editable: false,
    sortable: false,
    filterable: false,
    renderHeader: renderFilterableHeader,
  },
  managementEndDate: {
    field: "managementEndDate",
    headerName: "管理終了日",
    width: 130,
    editable: false,
    sortable: false,
    filterable: false,
    renderHeader: renderFilterableHeader,
  },
  managementDate: {
    field: "managementDate",
    headerName: "管理開始～終了日",
    width: 190,
    editable: false,
    sortable: false,
    filterable: false,
    renderHeader: renderFilterableHeader,
  },
  propertyStatus: {
    field: "propertyStatus",
    headerName: "物件ステータス",
    width: 140,
    editable: false,
    sortable: false,
    filterable: false,
    type: "singleSelect",
    valueOptions: PROPERTY_STATUS_OPTIONS,
    filterOperators: [singleSelectContainsOperator],
    renderHeader: renderFilterableHeader,
  },
  ownerName: {
    field: "ownerName",
    headerName: "オーナー名",
    width: 190,
    editable: false,
    sortable: false,
    filterable: false,
    renderHeader: renderFilterableHeader,
  },
  processingStatus: {
    field: "processingStatus",
    headerName: `処理ステータス（${getPreviousMonthLabel()}）`,
    flex: 1,
    minWidth: 230,
    editable: false,
    sortable: false,
    filterable: false,
    type: "singleSelect",
    valueOptions: PROCESSING_STATUS_OPTIONS,
    filterOperators: [singleSelectContainsOperator],
    renderHeader: renderFilterableHeader,
  },
});

export const DEFAULT_PROPERTY_COLUMN_CONFIGS: PropertyColumnConfig[] =
  PROPERTY_COLUMN_SOURCES.filter(
    ({ field }) => !["managementStartDate", "managementEndDate"].includes(field)
  ).map(({ field, headerName, visible }: PropertyColumnSource) => ({
    field,
    headerName,
    dataSource: field,
    visible,
  }));

export const createPropertyColumns = ({
  renderFilterableHeader,
  columnConfigs = DEFAULT_PROPERTY_COLUMN_CONFIGS,
}: Params): GridColDef<PropertyRow>[] => {
  const baseColumnMap = buildBaseColumnMap(renderFilterableHeader);

  return columnConfigs
  .filter((config) => config.visible !== false)
  .map((config) => {
    const baseColumn = baseColumnMap[config.dataSource ?? config.field];

    if (baseColumn) {
      return {
        ...baseColumn,
        field: config.field,
        headerName:
          config.dataSource === "processingStatus"
            ? config.headerName || `処理ステータス（${getPreviousMonthLabel()}）`
            : config.headerName,
        valueGetter:
          config.field !== (config.dataSource ?? config.field)
            ? (_value, row) => {
                const dynamicRow = row as PropertyRow & Record<string, unknown>;
                return dynamicRow[config.dataSource ?? config.field] ?? "";
              }
            : baseColumn.valueGetter,
      };
    }

    return {
      field: config.field,
      headerName: config.headerName,
      width: 160,
      editable: false,
      sortable: false,
      filterable: false,
      renderHeader: renderFilterableHeader,
      valueGetter: (_value, row) => {
        const dynamicRow = row as PropertyRow & Record<string, unknown>;
        return dynamicRow[config.dataSource ?? config.field] ?? "";
      },
    };
  });
};
