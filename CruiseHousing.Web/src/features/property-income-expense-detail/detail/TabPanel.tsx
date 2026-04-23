import { PropertyHeaderProps } from "@/features/shared/commonTypes";
import { PropertyIncomeExpenseDetailRow } from "../types";
import PropertyIncomeExpenseDetailGrid from "./PropertyIncomeExpenseDetailGrid";
import { PropertyInfo } from "@/features/shared/PropertyInfo";

/**
 * Tab panel component for displaying the selected property's header and editable grid.
 * Only the active tab is rendered.
 */
export const TabPanel = ({
  active,
  header,
  rows,
  onRowsChange,
  onDirtyChange,
  onSelectedRowsChange,
  isScreenLoading,
}: {
  active: boolean;
  header?: PropertyHeaderProps;
  rows: PropertyIncomeExpenseDetailRow[];
  onRowsChange: (nextRows: PropertyIncomeExpenseDetailRow[]) => void;
  onDirtyChange?: () => void;
  onSelectedRowsChange?: (rows: PropertyIncomeExpenseDetailRow[]) => void;
  isScreenLoading: boolean;
}) => {
  // Do not render anything when the tab is inactive
  // or when header information is not available.
  if (!active || !header) return null;

  return (
    <>
      {/* Property summary section */}
      <PropertyInfo {...header} />

      {/* Editable detail grid */}
      <div className="property-income-expense-detail-grid-contaniner">
        <PropertyIncomeExpenseDetailGrid
          key={header.propertyCode}
          rows={rows}
          onRowsChange={onRowsChange}
          onDirtyChange={onDirtyChange}
          onSelectedRowsChange={onSelectedRowsChange}
          isScreenLoading={isScreenLoading}
        />
      </div>
    </>
  );
};