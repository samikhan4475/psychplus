import { create } from 'zustand'

interface StoreState {
  showFilters: boolean
  toggleFilters: () => void
}

const useStore = create<StoreState>((set) => ({
  showFilters: true,
  toggleFilters: () => set((state) => ({ showFilters: !state.showFilters })),
}))

export { useStore }
