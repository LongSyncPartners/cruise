import { create } from "zustand";

export const usePaintStore = create((set) => ({
  paintColor: "",          // màu đang chọn
  paintEnabled: false,     // có đang bật chế độ sơn không
  setPaintColor: (c) => set({ paintColor: c }),
  setPaintEnabled: (v) => set({ paintEnabled: v }),
  clearPaint: () => set({ paintColor: "", paintEnabled: false }),
}));