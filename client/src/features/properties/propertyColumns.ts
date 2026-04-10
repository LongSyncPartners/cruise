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

type Params = {
  renderFilterableHeader: GridColDef["renderHeader"];
};

export const createPropertyColumns = ({
  renderFilterableHeader,
}: Params): GridColDef<PropertyRow>[] => [
  {
    field: "propertyCode",
    headerName: "物件番号",
    width: 90,
    editable: false,
    sortable: false,
    filterable: false,
    renderHeader: renderFilterableHeader,
  },
  {
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
  {
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
  {
    field: "managementCompany",
    headerName: "管理会社",
    width: 160,
    editable: false,
    sortable: false,
    filterable: false,
    renderHeader: renderFilterableHeader,
  },
  {
    field: "managementDate",
    headerName: "管理開始～終了日",
    width: 190,
    editable: false,
    sortable: false,
    filterable: false,
    renderHeader: renderFilterableHeader,
  },
  {
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
  {
    field: "ownerName",
    headerName: "オーナー名",
    width: 190,
    editable: false,
    sortable: false,
    filterable: false,
    renderHeader: renderFilterableHeader,
  },
  {
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
];