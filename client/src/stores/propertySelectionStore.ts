import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { GridRowId } from "@mui/x-data-grid";

type PropertySelectionState = {
  selectedRowId: GridRowId | null;
  selectedPropertyCode: string | null;
  setSelectedProperty: (rowId: GridRowId, propertyCode: string) => void;
  clearSelectedProperty: () => void;
};

export const usePropertySelectionStore = create<PropertySelectionState>()(
  persist(
    (set) => ({
      selectedRowId: null,
      selectedPropertyCode: null,
      setSelectedProperty: (rowId, propertyCode) =>
        set({
          selectedRowId: rowId,
          selectedPropertyCode: propertyCode,
        }),
      clearSelectedProperty: () =>
        set({
          selectedRowId: null,
          selectedPropertyCode: null,
        }),
    }),
    {
      name: "property-selection-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);