import { ProcessingStatusStateRow } from "./types";

export const PROPERTY_TYPE_OPTIONS = [
  { value: "apartment", label: "アパート" },
  { value: "mansion", label: "マンション" },
  { value: "house", label: "戸建て" },
];

export const MANAGEMENT_TYPE_OPTIONS = [
  { value: "一般管理", label: "一般管理" },
  { value: "サブリース", label: "サブリース" },
];

export const PROPERTY_STATUS_OPTIONS = [
  { value: "active", label: "管理中" },
  { value: "closed", label: "終了" },
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