import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  GridFilterModel,
  GridSortModel,
  GridPaginationModel,
  GridRowId,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import type { Dispatch, SetStateAction } from "react";

export type PropertiesGridState = {
  filterModel: GridFilterModel;
  sortModel: GridSortModel;
  paginationModel: GridPaginationModel;
  rowSelectionModel: GridRowSelectionModel;

  setFilterModel: Dispatch<SetStateAction<GridFilterModel>>;
  setSortModel: Dispatch<SetStateAction<GridSortModel>>;
  setPaginationModel: Dispatch<SetStateAction<GridPaginationModel>>;
  setRowSelectionModel: Dispatch<SetStateAction<GridRowSelectionModel>>;

  resetGridView: () => void;
  clearGridState: () => void;
};

const createInitialRowSelectionModel = (): GridRowSelectionModel => ({
  type: "include",
  ids: new Set<GridRowId>(),
});

const createInitialGridState = () => ({
  filterModel: { items: [] } as GridFilterModel,
  sortModel: [] as GridSortModel,
  paginationModel: { page: 0, pageSize: 20 } as GridPaginationModel,
  rowSelectionModel: createInitialRowSelectionModel(),
});

export const usePropertiesGridStore = create<PropertiesGridState>()(
  persist(
    (set) => ({
      ...createInitialGridState(),

      setFilterModel: (value) =>
        set((state) => ({
          filterModel:
            typeof value === "function" ? value(state.filterModel) : value,
          paginationModel: {
            ...state.paginationModel,
            page: 0,
          },
        })),

      setSortModel: (value) =>
        set((state) => ({
          sortModel: typeof value === "function" ? value(state.sortModel) : value,
          paginationModel: {
            ...state.paginationModel,
            page: 0,
          },
        })),

      setPaginationModel: (value) =>
        set((state) => ({
          paginationModel:
            typeof value === "function" ? value(state.paginationModel) : value,
        })),

      setRowSelectionModel: (value) =>
        set((state) => ({
          rowSelectionModel:
            typeof value === "function"
              ? value(state.rowSelectionModel)
              : value,
        })),

      resetGridView: () =>
        set((state) => ({
          paginationModel: {
            ...state.paginationModel,
            page: 0,
          },
          rowSelectionModel: createInitialRowSelectionModel(),
        })),

      clearGridState: () =>
        set({
          ...createInitialGridState(),
        }),
    }),
    {
      name: "properties-grid-store",
      storage: createJSONStorage(() => sessionStorage),

      partialize: (state) => ({
        filterModel: state.filterModel,
        sortModel: state.sortModel,
        paginationModel: state.paginationModel,
        rowSelectionModel: {
          ...state.rowSelectionModel,
          ids: Array.from(state.rowSelectionModel.ids),
        },
      }),

      merge: (persistedState, currentState) => {
        const typedPersistedState =
          persistedState as Partial<PropertiesGridState> & {
            rowSelectionModel?: {
              type: "include" | "exclude";
              ids: GridRowId[];
            };
          };

        return {
          ...currentState,
          ...typedPersistedState,
          rowSelectionModel: typedPersistedState.rowSelectionModel
            ? {
                ...typedPersistedState.rowSelectionModel,
                ids: new Set(typedPersistedState.rowSelectionModel.ids),
              }
            : currentState.rowSelectionModel,
        };
      },
    }
  )
);