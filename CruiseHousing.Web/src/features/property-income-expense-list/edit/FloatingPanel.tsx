import { useMemo } from "react";

import { SubjectOption, TabOption } from "../subjectOptions";
import { type ListEditRow } from "../types";
import { LIST_EDIT_COLUMN_LABELS } from "./ListEditColumnLabels";

import CommonFloatingPanel from "@/features/shared/CommonFloatingPanel";
import { FloatingPanelOption, type FloatingPanelFieldConfig } from "@/features/shared/types";

type Props = {
  open: boolean;
  onClose: () => void;
  selectedRow: ListEditRow | null;
  onSelectedRowChange?: (row: ListEditRow) => void;
  detailTabs: TabOption[];
  subjectTabs: SubjectOption[];
};

const FLOAT_PANEL_DISPLAY_FIELDS = [
  "transactionDate",
  "detailType",
  "subject",
  "amount",
  "masterAmount",
  "accountingSubjectName",
  "appliedSubjectAux",
  "debit",
  "debitAux",
  "credit",
  "creditAux",
] as const satisfies readonly (keyof ListEditRow)[];

type FloatPanelDisplayField = (typeof FLOAT_PANEL_DISPLAY_FIELDS)[number];

export default function FloatingPanel({
  open,
  onClose,
  selectedRow,
  onSelectedRowChange,
  detailTabs,
  subjectTabs,
}: Props) {

  const fieldComponentMap = useMemo<
    Record<FloatPanelDisplayField, FloatingPanelFieldConfig>
  >(
    () => ({
      transactionDate: { type: "date", required: true },
      detailType: {
        type: "select",
        required: true,
        options: detailTabs as FloatingPanelOption[],
      },
      subject: {
        type: "select",
        required: true,
        options: subjectTabs as FloatingPanelOption[],
      },
      amount: { type: "currency" },
      masterAmount: { type: "currency" },
      accountingSubjectName: { type: "text", required: true, maxLength: 100 },
      appliedSubjectAux: { type: "text", maxLength: 100 },
      debit: { type: "text", maxLength: 100 },
      debitAux: { type: "text", maxLength: 100 },
      credit: { type: "text", maxLength: 100 },
      creditAux: { type: "text", maxLength: 100 },
    }),
    [detailTabs, subjectTabs]
  );

  return (
    <CommonFloatingPanel
      open={open}
      onClose={onClose}
      selectedRow={selectedRow}
      displayFields={FLOAT_PANEL_DISPLAY_FIELDS}
      fieldLabels={LIST_EDIT_COLUMN_LABELS}
      fieldComponentMap={fieldComponentMap}
      onSelectedRowChange={onSelectedRowChange}
    />
  );
}