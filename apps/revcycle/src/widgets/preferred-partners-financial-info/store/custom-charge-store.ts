import { type StateCreator, type StoreApi, type UseBoundStore } from 'zustand'

interface CustomChargeState {
  customChargePopup: boolean
  setCustomChargePopup: (open: boolean) => void
}

type CustomChargeStoreType = UseBoundStore<StoreApi<CustomChargeState>>

const createCustomChargeStore: StateCreator<CustomChargeState> = (set) => ({
  customChargePopup: false,
  setCustomChargePopup: (open) => set({ customChargePopup: open }),
})

export {
  createCustomChargeStore,
  type CustomChargeStoreType,
  type CustomChargeState,
}
