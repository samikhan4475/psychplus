import { create } from 'zustand'

interface Store {
  isUserLocked: boolean
  toggleUserLock: () => void
}

const useStore = create<Store>((set) => ({
  isUserLocked: true,
  toggleUserLock: () => set((state) => ({ isUserLocked: !state.isUserLocked })),
}))

export { useStore }
