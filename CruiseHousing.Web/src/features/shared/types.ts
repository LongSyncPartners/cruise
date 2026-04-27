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
export type FloatPanelField = "text" | "currency" | "date" | "select";

export type FloatingPanelOption = {
  value: string | number;
  label: string;
};

type BaseFloatingPanelFieldConfig = {
  required?: boolean;
  maxLength?: number;
  readOnly?: boolean;
};

export type FloatingPanelFieldConfig =
  | (BaseFloatingPanelFieldConfig & {
      type: "text";
    })
  | (BaseFloatingPanelFieldConfig & {
      type: "currency";
    })
  | (BaseFloatingPanelFieldConfig & {
      type: "date";
    })
  | (BaseFloatingPanelFieldConfig & {
      type: "select";
      options: FloatingPanelOption[];
    });

export type CommonFloatingPanelProps<TRow extends { id?: string | number }, TField extends keyof TRow> = {
  open: boolean;
  onClose: () => void;
  selectedRow: TRow | null;
  displayFields: readonly TField[];
  fieldLabels: Partial<Record<TField, string>>;
  fieldComponentMap: Record<TField, FloatingPanelFieldConfig>;
  onSelectedRowChange?: (row: TRow) => void;
};