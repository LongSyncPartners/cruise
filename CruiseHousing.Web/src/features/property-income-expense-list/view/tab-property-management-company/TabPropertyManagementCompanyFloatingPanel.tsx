import { type TabPropertyManagementCompanyRow } from "../../types";
import { TAB_PROPERTY_MANAGEMENT_COMPANY_COLUMN_LABELS } from "./TabPropertyManagementCompanyColumnLabels";

import CommonFloatingPanel from "@/features/shared/CommonFloatingPanel";
import { type FloatingPanelFieldConfig } from "@/features/shared/types";

type Props = {
  open: boolean;
  onClose: () => void;
  selectedRow: TabPropertyManagementCompanyRow | null;
};

const FLOAT_PANEL_DISPLAY_FIELDS = [
  "yearMonth",

  "rentAmount",
  "otherIncomeAmount",
  "totalIncomeAmount",

  "managementFee",
  "repairCost",
  "gardenMaintenanceCost",
  "brokerageFee",
  "otherExpenseAmount",
  "totalExpenseAmount",

  "netAmount",
  "receivedAmount",
  "differenceAmount",
] as const satisfies readonly (keyof TabPropertyManagementCompanyRow)[];

type FloatPanelDisplayField = (typeof FLOAT_PANEL_DISPLAY_FIELDS)[number];

const FIELD_COMPONENT_MAP: Record<
  FloatPanelDisplayField,
  FloatingPanelFieldConfig
> = {
  yearMonth: { type: "text", readOnly: true },

  rentAmount: { type: "currency", readOnly: true },
  otherIncomeAmount: { type: "currency", readOnly: true },
  totalIncomeAmount: { type: "currency", readOnly: true },

  managementFee: { type: "currency", readOnly: true },
  repairCost: { type: "currency", readOnly: true },
  gardenMaintenanceCost: { type: "currency", readOnly: true },
  brokerageFee: { type: "currency", readOnly: true },
  otherExpenseAmount: { type: "currency", readOnly: true },
  totalExpenseAmount: { type: "currency", readOnly: true },

  netAmount: { type: "currency", readOnly: true },
  receivedAmount: { type: "currency", readOnly: true },
  differenceAmount: { type: "currency", readOnly: true },
};

export default function TabPropertyManagementCompanyFloatingPanel({
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
      fieldLabels={TAB_PROPERTY_MANAGEMENT_COMPANY_COLUMN_LABELS}
      fieldComponentMap={FIELD_COMPONENT_MAP}
    />
  );
}