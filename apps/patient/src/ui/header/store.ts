import { create } from 'zustand'

interface Store {
  responsiveMenuOpen: boolean
  toggleResponsiveMenuOpen: () => void
  responsiveMenuExpandedState: string[]
  setResponsiveMenuExpandedState: (value: string[]) => void
  closeMenu: () => void
}

const useStore = create<Store>((set) => ({
  responsiveMenuOpen: false,
  responsiveMenuExpandedState: [],
  toggleResponsiveMenuOpen: () => {
    set((state) => ({
      responsiveMenuOpen: !state.responsiveMenuOpen,
      responsiveMenuExpandedState: state.responsiveMenuOpen
        ? []
        : state.responsiveMenuExpandedState,
    }))
  },
  setResponsiveMenuExpandedState: (responsiveMenuExpandedState) => {
    set({ responsiveMenuExpandedState })
  },
  closeMenu: () => {
    set({
      responsiveMenuOpen: false,
      responsiveMenuExpandedState: [],
    })
  },
}))

export { useStore }
