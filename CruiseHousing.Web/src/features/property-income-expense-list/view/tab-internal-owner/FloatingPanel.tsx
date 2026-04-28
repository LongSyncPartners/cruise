import { type TabInternalOwnerRow } from "../../types";
import { TAB_INTERNAL_OWNER_COLUMN_LABELS } from "./ColumnLabels";

import CommonFloatingPanel from "@/features/shared/CommonFloatingPanel";
import { type FloatingPanelFieldConfig } from "@/features/shared/types";

type Props = {
  open: boolean;
  onClose: () => void;
  selectedRow: TabInternalOwnerRow | null;
};

const FLOAT_PANEL_DISPLAY_FIELDS = [
  "yearMonth",

  "totalIncomeAmount",
  "rentAmount",
  "otherIncomeAmount",

  "totalExpenseAmount",
  "managementFee",
  "repairCost",
  "gardenMaintenanceCost",
  "brokerageFee",
  "subleaseCost",
  "otherExpenseAmount",
  "extraPaymentCost",

  "managementCompanyIncome",
] as const satisfies readonly (keyof TabInternalOwnerRow)[];

type FloatPanelDisplayField = (typeof FLOAT_PANEL_DISPLAY_FIELDS)[number];

const FIELD_COMPONENT_MAP: Record<
  FloatPanelDisplayField,
  FloatingPanelFieldConfig
> = {
  yearMonth: { type: "text", readOnly: true },

  totalIncomeAmount: { type: "currency", readOnly: true },
  rentAmount: { type: "currency", readOnly: true },
  otherIncomeAmount: { type: "currency", readOnly: true },

  totalExpenseAmount: { type: "currency", readOnly: true },
  managementFee: { type: "currency", readOnly: true },
  repairCost: { type: "currency", readOnly: true },
  gardenMaintenanceCost: { type: "currency", readOnly: true },
  brokerageFee: { type: "currency", readOnly: true },
  subleaseCost: { type: "currency", readOnly: true },
  otherExpenseAmount: { type: "currency", readOnly: true },
  extraPaymentCost: { type: "currency", readOnly: true },

  managementCompanyIncome: { type: "currency", readOnly: true },
};

export default function TabInternalOwnerFloatingPanel({
  open,
  onClose,
  selectedRow,
}: Props) {
  return (
    <CommonFloatingPanel
      open={open}
      onClose={onClose}
      selectedRow={selectedRow}
      displayFields={FLOAT_PANEL_DISPLAY_FIELDS}
      fieldLabels={TAB_INTERNAL_OWNER_COLUMN_LABELS}
      fieldComponentMap={FIELD_COMPONENT_MAP}
    />
  );
}