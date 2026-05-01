import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { ListEditRow } from "@/features/property-income-expense-list/types";

type PropertyIncomeExpenseListState = {
  rows: ListEditRow[];

  // actions
  setRows: (rows: ListEditRow[]) => void;
  addRows: (rows: ListEditRow[]) => void;
  updateRow: (rowId: string | number, data: Partial<ListEditRow>) => void;
  deleteRows: (rowIds: (string | number)[]) => void;
  clearRows: () => void;
};

export const usePropertyIncomeExpenseListStore =
  create<PropertyIncomeExpenseListState>()(
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