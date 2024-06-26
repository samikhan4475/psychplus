import { type StateCreator, type StoreApi, type UseBoundStore } from 'zustand'
import { type CreditCard, type ServicesHistory } from '../types'

interface ServicesHistoryState {
  servicesHistoryList: ServicesHistory[]
  setServicesHistoryList: (servicesHistoryList: ServicesHistory[]) => void
  addCustomCharge: (creditCard: ServicesHistory) => void
  addCustomChargeDialogOpen: boolean
  setAddCustomChargeDialogOpen: (open: boolean) => void

  addPaymentDialogOpen: boolean
  setAddPaymentDialogOpen: (open: boolean) => void

  selectCardDialogOpen: boolean
  setSelectCardDialogOpen: (open: boolean) => void

  selectedCard: CreditCard | null
  setSelectedCard: (card: CreditCard) => void
}

type ServicesHistoryType = UseBoundStore<StoreApi<ServicesHistoryState>>

const createServicesHistoryStore: StateCreator<ServicesHistoryState> = (
  set,
  get,
  store,
) => ({
  servicesHistoryList: [],
  setServicesHistoryList: (servicesHistoryList: ServicesHistory[]) =>
    set({ servicesHistoryList }),
  addCustomCharge: (creditCard: ServicesHistory) => {
    set((state) => ({
      servicesHistoryList: [...state.servicesHistoryList, creditCard],
    }))
  },
  addCustomChargeDialogOpen: false,
  setAddCustomChargeDialogOpen: (open) =>
    set({ addCustomChargeDialogOpen: open }),

  addPaymentDialogOpen: false,
  setAddPaymentDialogOpen: (open) => set({ addPaymentDialogOpen: open }),

  selectCardDialogOpen: false,
  setSelectCardDialogOpen: (open) => set({ selectCardDialogOpen: open }),

  selectedCard: null,
  setSelectedCard: (open) => set({ selectedCard: open }),
})

export {
  createServicesHistoryStore,
  type ServicesHistoryType,
  type ServicesHistoryState,
}
