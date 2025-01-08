import { create } from 'zustand'


interface Store {
  editingRow: number | null
  setEditingRow: (rowIndex: number | null) => void
}

const useStore = create<Store>((set, get) => ({
  loadingDea: false,
  editingRow: null,
  setEditingRow: (rowIndex) => set({ editingRow: rowIndex }),
}))
export { useStore }
