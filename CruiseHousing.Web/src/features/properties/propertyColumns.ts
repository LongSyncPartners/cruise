import type { GridColDef } from "@mui/x-data-grid";
import type { PropertyColumnConfig, PropertyRow } from "./types";
import { singleSelectContainsOperator } from "../shared/createFilterableHeader";
import { getPreviousMonthLabel } from "../shared/utils";
import { OptionItem } from "../shared/types";

type Params = {
  renderFilterableHeader: GridColDef["renderHeader"];
  columnConfigs?: PropertyColumnConfig[];
  managementTypeOptions: OptionItem[];
  propertyTypeOptions: OptionItem[];
  propertyStatusOptions: OptionItem[];
  processingStatusOptions: OptionItem[];
};

const buildBaseColumnMap = ({
  renderFilterableHeader,
  managementTypeOptions,
  propertyTypeOptions,
  propertyStatusOptions,
  processingStatusOptions,
}: Omit<Params, "columnConfigs">): Record<string, GridColDef<PropertyRow>> => ({
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
    width: 90,
    editable: false,
    sortable: false,
    filterable: false,
    type: "singleSelect",
    valueOptions: managementTypeOptions,
    filterOperators: [singleSelectContainsOperator],
    renderHeader: renderFilterableHeader,
  },
  propertyType: {
    field: "propertyType",
    headerName: "建物種別",
    width: 90,
    editable: false,
    sortable: false,
    filterable: false,
    type: "singleSelect",
    valueOptions: propertyTypeOptions,
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
    width: 180,
    editable: false,
    sortable: false,
    filterable: false,
    renderHeader: renderFilterableHeader,
  },
  propertyStatus: {
    field: "propertyStatus",
    headerName: "物件ステータス",
    headerClassName: "wrap-header",
    width: 90,
    editable: false,
    sortable: false,
    filterable: false,
    type: "singleSelect",
    valueOptions: propertyStatusOptions,
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
    valueOptions: processingStatusOptions,
    filterOperators: [singleSelectContainsOperator],
    renderHeader: renderFilterableHeader,
  },
});

export const createPropertyColumns = ({
  renderFilterableHeader,
  columnConfigs = [],
  managementTypeOptions,
  propertyTypeOptions,
  propertyStatusOptions,
  processingStatusOptions,
}: Params): GridColDef<PropertyRow>[] => {
  const baseColumnMap = buildBaseColumnMap({
    renderFilterableHeader,
    managementTypeOptions,
    propertyTypeOptions,
    propertyStatusOptions,
    processingStatusOptions,
  });

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