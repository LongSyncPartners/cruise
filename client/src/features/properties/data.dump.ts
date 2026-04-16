import {
  MANAGEMENT_TYPE_OPTIONS,
  PROCESSING_STATUS_OPTIONS,
  PROPERTY_STATUS_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
} from "./property";
import { type PropertyRow } from "./types";
import { addDays, format } from "date-fns";

const today = new Date();

export const paggingdata: PropertyRow[] = Array.from(
  { length: 400 },
  (_, i) => ({
    id: i + 1,
    propertyCode:
      i % 3 === 0
        ? `C-${(i + 1).toString().padStart(2, "0")}`
        : i % 3 === 1
          ? `H-${(i + 1).toString().padStart(2, "0")}`
          : `T-${(i + 1).toString().padStart(2, "0")}`,
    managementType: MANAGEMENT_TYPE_OPTIONS[i % 2].value,
    propertyType: PROPERTY_TYPE_OPTIONS[i % 3].value,
    managementCompany: `株式会社ウッドストック${i + 1}`,
    managementStartDate: format(addDays(today, i), "yyyy/MM/dd"),
    managementEndDate: format(addDays(today, i + 30), "yyyy/MM/dd"),
    managementDate: `${format(addDays(today, i), "yyyy/MM/dd")} ～ ${format(addDays(today, i + 30), "yyyy/MM/dd")}`,
    propertyStatus: PROPERTY_STATUS_OPTIONS[i % 2].value,
    ownerName: `株式会社中部建材センター ${i + 1}`,
    processingStatus: PROCESSING_STATUS_OPTIONS[i % 8].value,
    propertyName : `物件${i}`,
    propertyAddress : `住所${i}`
  })
);

export type PropertyColumnSource = {
  field: Exclude<keyof PropertyRow, "id">;
  headerName: string;
  visible: boolean;
};

export const PROPERTY_COLUMN_SOURCES: PropertyColumnSource[] = [
  { field: "propertyCode", headerName: "物件番号", visible: true },
  { field: "managementType", headerName: "管理種別", visible: true },
  { field: "propertyType", headerName: "建物種別", visible: true },
  { field: "managementCompany", headerName: "管理会社", visible: true },
  { field: "managementStartDate", headerName: "管理開始日", visible: true },
  { field: "managementEndDate", headerName: "管理終了日", visible: true },
  { field: "managementDate", headerName: "管理開始～終了日", visible: true },
  { field: "propertyStatus", headerName: "物件ステータス", visible: true },
  { field: "ownerName", headerName: "オーナー名", visible: true },
  { field: "processingStatus", headerName: "処理ステータス", visible: true },
  { field: "propertyName", headerName: "物件名", visible: false },
  { field: "propertyAddress", headerName: "物件住所", visible: false },
];

export const PROPERTY_COLUMN_SOURCE_OPTIONS = PROPERTY_COLUMN_SOURCES
.filter(({ visible }) => visible == false)
.map(
  ({ field, headerName, visible }) => ({
    value: field,
    label: headerName,
    visible : visible
  })
);
