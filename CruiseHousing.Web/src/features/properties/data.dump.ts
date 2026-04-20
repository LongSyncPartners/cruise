
import { ProcessingStatusStateRow, type PropertyRow } from "./types";
import { addDays, format } from "date-fns";

export const MANAGEMENT_TYPE_OPTIONS = [
  { value: "一般管理", label: "一般管理" },
  { value: "サブリース", label: "サブリース" },
];

export const PROPERTY_TYPE_OPTIONS = [
  { value: "アパート", label: "アパート" },
  { value: "マンション", label: "マンション" },
  { value: "戸建て", label: "戸建て" },
];

export const PROPERTY_STATUS_OPTIONS = [
  { value: "管理中", label: "管理中" },
  { value: "終了", label: "終了" },
];

export type ProcessingStatus =
  | "000"
  | "010"
  | "011"
  | "020"
  | "021"
  | "030"
  | "031"
  | "999";

export const PROCESSING_STATUS_OPTIONS: {
  value: ProcessingStatus;
  label: string;
}[] = [
  { value: "000", label: "000 / 未処理" },
  { value: "010", label: "010 / 物件収支明細編集中" },
  { value: "011", label: "011 / 物件収支明細完了" },
  { value: "020", label: "020 / 物件別収支一覧編集中" },
  { value: "021", label: "021 / 物件別収支一覧完了" },
  { value: "030", label: "030 / 収支報告書ドラフト編集中" },
  { value: "031", label: "031 / 収支報告書ドラフト完了" },
  { value: "999", label: "999 / 完了" },
];

export const PROCESSING_STATUS_MAP = Object.fromEntries(
  PROCESSING_STATUS_OPTIONS.map((item) => [item.value, item.label])
);

export const PROCESSING_STATUS_STATE_ROWS: ProcessingStatusStateRow[] = [
  { code: "000", name: "未処理", state: "*" },
  { code: "010", name: "物件収支明細編集中", state: "*" },
  { code: "011", name: "物件収支明細完了", state: "" },
  { code: "020", name: "物件別収支一覧編集中", state: "" },
  { code: "021", name: "物件別収支一覧完了", state: "" },
  { code: "030", name: "収支報告書ドラフト編集中", state: "" },
  { code: "031", name: "収支報告書ドラフト完了", state: "" },
  { code: "999", name: "完了", state: "" },
];

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
