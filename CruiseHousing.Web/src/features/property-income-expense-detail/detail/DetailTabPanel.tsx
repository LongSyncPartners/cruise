import { PropertyHeaderProps } from "@/features/shared/types";
import { PropertyIncomeExpenseDetailRow } from "../types";
import PropertyIncomeExpenseDetailGrid from "./DetailGrid";
import { PropertyInfo } from "@/features/shared/PropertyInfo";
import { CellContextMenuState } from "@/features/shared/CustomContextMenu";

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
  onSelectedRowChange,
  isScreenLoading,
  onOpenFloatPanelClick
}: {
  active: boolean;
  header?: PropertyHeaderProps;
  rows: PropertyIncomeExpenseDetailRow[];
  onRowsChange: (nextRows: PropertyIncomeExpenseDetailRow[]) => void;
  onDirtyChange?: () => void;
  onSelectedRowsChange?: (rows: PropertyIncomeExpenseDetailRow[]) => void;
  onSelectedRowChange?: (row: PropertyIncomeExpenseDetailRow) => void;
  isScreenLoading: boolean;
  onOpenFloatPanelClick: (menu: NonNullable<CellContextMenuState>) => void;
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
          onSelectedRowChange={onSelectedRowChange}
          isScreenLoading={isScreenLoading}
          onOpenFloatPanelClick={onOpenFloatPanelClick}
        />
      </div>
    </>
  );
};