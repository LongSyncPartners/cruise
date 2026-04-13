import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { PropertyIncomeExpenseDetailRow } from "@/features/property-income-expense-detail/types";

type PropertyIncomeExpenseDetailState = {
  rows: PropertyIncomeExpenseDetailRow[];

  // actions
  setRows: (rows: PropertyIncomeExpenseDetailRow[]) => void;
  addRows: (rows: PropertyIncomeExpenseDetailRow[]) => void;
  updateRow: (rowId: string | number, data: Partial<PropertyIncomeExpenseDetailRow>) => void;
  deleteRows: (rowIds: (string | number)[]) => void;
  clearRows: () => void;
};

export const usePropertyIncomeExpenseDetailStore =
  create<PropertyIncomeExpenseDetailState>()(
    devtools((set) => ({
      rows: [],

      setRows: (rows) => set({ rows }),

      addRows: (newRows) =>
        set((state) => ({
          rows: [...state.rows, ...newRows],
        })),

      updateRow: (rowId, data) =>
        set((state) => ({
          rows: state.rows.map((row) =>
            row.id === rowId ? { ...row, ...data } : row
          ),
        })),

      deleteRows: (rowIds) =>
        set((state) => ({
          rows: state.rows.filter((row) => !rowIds.includes(row.id)),
        })),

      clearRows: () => set({ rows: [] }),
    }))
  );