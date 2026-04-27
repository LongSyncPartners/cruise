/**
 * Tab summary only
 */
export type PropertyHeaderProps = {
  propertyCode: string;
  roomCode?: string;
  managementType: string;
  propertyType: string;
  managementCompany: string;
  managementPeriod?: string;
  owner?: string;
};

export type PropertyTabSummary = {
  id: string;
  label: string;
  header: PropertyHeaderProps;
};

/**
 * FloatingPanel
 */
export type FloatPanelField = "text" | "currency" | "date";

export type FloatingPanelFieldConfig = {
  type: FloatPanelField;
  required?: boolean;
  maxLength?: number;
  readOnly?: boolean;
};

export type CommonFloatingPanelProps<TRow extends { id?: string | number }, TField extends keyof TRow> = {
  open: boolean;
  onClose: () => void;
  selectedRow: TRow | null;
  displayFields: readonly TField[];
  fieldLabels: Partial<Record<TField, string>>;
  fieldComponentMap: Record<TField, FloatingPanelFieldConfig>;
  onSelectedRowChange?: (row: TRow) => void;
};