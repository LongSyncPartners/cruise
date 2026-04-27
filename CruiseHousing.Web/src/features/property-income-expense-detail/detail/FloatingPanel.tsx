import { type PropertyIncomeExpenseDetailRow } from "../types";
import { PROPERTY_INCOME_EXPENSE_DETAIL_COLUMN_LABELS } from "./DetailColumnLabels";

import CommonFloatingPanel from "@/features/shared/CommonFloatingPanel";
import {
  type FloatingPanelFieldConfig,
} from "@/features/shared/types";

type Props = {
  open: boolean;
  onClose: () => void;
  selectedRow: PropertyIncomeExpenseDetailRow | null;
  onSelectedRowChange?: (row: PropertyIncomeExpenseDetailRow) => void;
};

const FLOAT_PANEL_DISPLAY_FIELDS = [
  "yearMonth",
  "expectedAmount",
  "managementCompanyAmount",
  "transactionDate",
  "counterparty",
  "description",
  "income",
  "expense",
  "balance",
  "note",
] as const satisfies readonly (keyof PropertyIncomeExpenseDetailRow)[];

type FloatPanelDisplayField = (typeof FLOAT_PANEL_DISPLAY_FIELDS)[number];

const FIELD_COMPONENT_MAP: Record<
  FloatPanelDisplayField,
  FloatingPanelFieldConfig
> = {
  yearMonth: { type: "text", readOnly: true },
  expectedAmount: { type: "currency", readOnly: true },
  managementCompanyAmount: { type: "currency" },
  transactionDate: { type: "date", required: true },
  counterparty: { type: "text", required: true, maxLength: 40 },
  description: { type: "text", required: true, maxLength: 100 },
  income: { type: "currency" },
  expense: { type: "currency" },
  balance: { type: "currency", readOnly: true },
  note: { type: "text", maxLength: 200 },
};

export default function FloatingPanel({
  open,
  onClose,
  selectedRow,
  onSelectedRowChange,
}: Props) {
  return (
    <CommonFloatingPanel
      open={open}
      onClose={onClose}
      selectedRow={selectedRow}
      displayFields={FLOAT_PANEL_DISPLAY_FIELDS}
      fieldLabels={PROPERTY_INCOME_EXPENSE_DETAIL_COLUMN_LABELS}
      fieldComponentMap={FIELD_COMPONENT_MAP}
      onSelectedRowChange={onSelectedRowChange}
    />
  );
}