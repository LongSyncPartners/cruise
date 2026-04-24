export const DETAIL_TAB_VALUES = {
  ALL: 0,
  PROPERTY_MANAGEMENT_COMPANY: 1,
  OWNER_MANAGEMENT_COMPANY: 2,
  INTERNAL_OWNER: 3,
  OWNER: 4,
} as const;

export type DetailTabValue =
  (typeof DETAIL_TAB_VALUES)[keyof typeof DETAIL_TAB_VALUES];

export type SubjectOption = {
  value: string;
  label: string;
};

export type TabOption = {
  value: DetailTabValue;
  label: string;
};

export const DETAIL_TAB_OPTIONS: TabOption[] = [
  { value: DETAIL_TAB_VALUES.ALL, label: "全て" },
  {
    value: DETAIL_TAB_VALUES.PROPERTY_MANAGEMENT_COMPANY,
    label: "物件管理会社",
  },
  {
    value: DETAIL_TAB_VALUES.OWNER_MANAGEMENT_COMPANY,
    label: "オーナー管理会社",
  },
  { value: DETAIL_TAB_VALUES.INTERNAL_OWNER, label: "貸主（自社）" },
  { value: DETAIL_TAB_VALUES.OWNER, label: "オーナー" },
];

export const SUBJECT_OPTIONS_BY_DETAIL_TAB: Record<
  Exclude<DetailTabValue, 0>,
  SubjectOption[]
> = {
  [DETAIL_TAB_VALUES.PROPERTY_MANAGEMENT_COMPANY]: [
    { value: "all", label: "全て" },
    { value: "rent", label: "家賃" },
    { value: "otherIncome", label: "その他収入" },
    { value: "managementFee", label: "管理料" },
    { value: "repairCost", label: "修繕費" },
    { value: "gardenMaintenance", label: "庭手入れ" },
    { value: "brokerageFee", label: "仲介手数料" },
    { value: "otherExpense", label: "その他支出" },
  ],

  [DETAIL_TAB_VALUES.OWNER_MANAGEMENT_COMPANY]: [
    { value: "all", label: "全て" },
    { value: "constructionDeposit", label: "工事預り金" },
    { value: "repairCost", label: "修繕費" },
    { value: "fee", label: "手数料" },
  ],

  [DETAIL_TAB_VALUES.INTERNAL_OWNER]: [
    { value: "all", label: "全て" },
    { value: "rent", label: "家賃" },
    { value: "managementFee", label: "管理料" },
    { value: "repairCost", label: "修繕費" },
    { value: "gardenMaintenance", label: "庭手入れ" },
    { value: "brokerageFee", label: "仲介手数料" },
    { value: "subleaseCost", label: "ｻﾌﾞﾘｰｽ原価" },
    { value: "otherExpense", label: "その他支出" },
    { value: "separatePaymentCost", label: "別途支払費用" },
  ],

  [DETAIL_TAB_VALUES.OWNER]: [
    { value: "all", label: "全て" },
    { value: "otherIncome", label: "その他収入" },
    { value: "managementFee", label: "管理料" },
    { value: "repairCost", label: "修繕費" },
    { value: "constructionFee", label: "工事手数料" },
    { value: "gardenMaintenance", label: "庭手入れ" },
    { value: "serviceFee", label: "手数料" },
    { value: "propertyTax", label: "固定資産税" },
    { value: "fireInsurance", label: "火災保険料" },
    { value: "floodInsurance", label: "洪水保険料" },
    { value: "hoaDues", label: "HOA Dues" },
    { value: "otherExpense", label: "その他支出" },
    { value: "ownerPaymentAmount", label: "ｵｰﾅｰ支払額" },
  ],
};

export const getSubjectOptionsByDetailTab = (
  detailTabValue: DetailTabValue
): SubjectOption[] => {
  if (detailTabValue !== DETAIL_TAB_VALUES.ALL) {
    return SUBJECT_OPTIONS_BY_DETAIL_TAB[detailTabValue] ?? [];
  }

  const uniqueOptions = new Map<string, SubjectOption>();

  uniqueOptions.set("all", { value: "all", label: "全て" });

  Object.values(SUBJECT_OPTIONS_BY_DETAIL_TAB)
    .flat()
    .forEach((option) => {
      if (option.value === "all") return;

      if (!uniqueOptions.has(option.value)) {
        uniqueOptions.set(option.value, option);
      }
    });

  return Array.from(uniqueOptions.values());
};

export const getSubjectLabelsByDetailTab = (
  detailTabValue: DetailTabValue
): string[] => {
  return getSubjectOptionsByDetailTab(detailTabValue).map((item) => item.label);
};