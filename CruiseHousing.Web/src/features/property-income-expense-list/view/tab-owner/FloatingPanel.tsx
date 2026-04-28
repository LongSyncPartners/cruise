import { type TabOwnerRow } from "../../types";
import { TAB_OWNER_COLUMN_LABELS } from "./ColumnLabels";

import CommonFloatingPanel from "@/features/shared/CommonFloatingPanel";
import { type FloatingPanelFieldConfig } from "@/features/shared/types";

type Props = {
  open: boolean;
  onClose: () => void;
  selectedRow: TabOwnerRow | null;
};

const FLOAT_PANEL_DISPLAY_FIELDS = [
  "yearMonth",

  "totalIncomeAmount",
  "subleaseRent",
  "otherIncomeAmount",

  "totalExpenseAmount",
  "managementFee",
  "repairCost",
  "constructionFee",
  "gardenMaintenanceCost",
  "fee",
  "propertyTax",
  "fireInsurance",
  "floodInsurance",
  "hoaDues",
  "fixedRepairCost",
  "otherExpenseAmount",

  "ownerPaymentAmount",
] as const satisfies readonly (keyof TabOwnerRow)[];

type FloatPanelDisplayField = (typeof FLOAT_PANEL_DISPLAY_FIELDS)[number];

const FIELD_COMPONENT_MAP: Record<
  FloatPanelDisplayField,
  FloatingPanelFieldConfig
> = {
  yearMonth: { type: "text", readOnly: true },

  totalIncomeAmount: { type: "currency", readOnly: true },
  subleaseRent: { type: "currency", readOnly: true },
  otherIncomeAmount: { type: "currency", readOnly: true },

  totalExpenseAmount: { type: "currency", readOnly: true },
  managementFee: { type: "currency", readOnly: true },
  repairCost: { type: "currency", readOnly: true },
  constructionFee: { type: "currency", readOnly: true },
  gardenMaintenanceCost: { type: "currency", readOnly: true },
  fee: { type: "currency", readOnly: true },
  propertyTax: { type: "currency", readOnly: true },
  fireInsurance: { type: "currency", readOnly: true },
  floodInsurance: { type: "currency", readOnly: true },
  hoaDues: { type: "currency", readOnly: true },
  fixedRepairCost: { type: "currency", readOnly: true },
  otherExpenseAmount: { type: "currency", readOnly: true },

  ownerPaymentAmount: { type: "currency", readOnly: true },
};

export default function TabOwnerFloatingPanel({
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
      fieldLabels={TAB_OWNER_COLUMN_LABELS}
      fieldComponentMap={FIELD_COMPONENT_MAP}
    />
  );
}