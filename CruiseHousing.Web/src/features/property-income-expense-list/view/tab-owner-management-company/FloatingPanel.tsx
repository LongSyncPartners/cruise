import { type TabOwnerManagementCompanyRow } from "../../types";
import { TAB_OWNER_MANAGEMENT_COMPANY_COLUMN_LABELS } from "./ColumnLabels";

import CommonFloatingPanel from "@/features/shared/CommonFloatingPanel";
import { type FloatingPanelFieldConfig } from "@/features/shared/types";

type Props = {
  open: boolean;
  onClose: () => void;
  selectedRow: TabOwnerManagementCompanyRow | null;
};

const FLOAT_PANEL_DISPLAY_FIELDS = [
  "yearMonth",

  "managementEntrust",
  "managementConsignment",
  "constructionDeposit",
  "repairCost",
  "fee",
] as const satisfies readonly (keyof TabOwnerManagementCompanyRow)[];

type FloatPanelDisplayField = (typeof FLOAT_PANEL_DISPLAY_FIELDS)[number];

const FIELD_COMPONENT_MAP: Record<
  FloatPanelDisplayField,
  FloatingPanelFieldConfig
> = {
  yearMonth: { type: "text", readOnly: true },

  managementEntrust: { type: "currency", readOnly: true },
  managementConsignment: { type: "currency", readOnly: true },
  constructionDeposit: { type: "currency", readOnly: true },
  repairCost: { type: "currency", readOnly: true },
  fee: { type: "currency", readOnly: true },
};

export default function TabOwnerManagementCompanyFloatingPanel({
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
      fieldLabels={TAB_OWNER_MANAGEMENT_COMPANY_COLUMN_LABELS}
      fieldComponentMap={FIELD_COMPONENT_MAP}
    />
  );
}