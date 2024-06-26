import { type StateCreator, type StoreApi, type UseBoundStore } from 'zustand'
import {  type CreditCard, PatientTransactions } from '../types'

interface CreditCardState {
  creditCardList: CreditCard[]
  setCreditCardList: (creditCardList: CreditCard[]) => void
  addCreditCard: (creditCard: CreditCard) => void
  addCreditCardDialogOpen: boolean
  setAddCreditCardDialogOpen: (open: boolean) => void

  refreshServicesHistory: boolean
  setRefreshServicesHistory: (open: boolean) => void

  servicesHistoryPopup: boolean
  setServicesHistoryPopup: (open: boolean) => void

  servicesHistoryEditTransaction: PatientTransactions | null
  setServicesHistoryEditTransaction: (selected: PatientTransactions) => void

  selectCardListPopup: boolean
  setSelectCardListPopup: (open: boolean) => void

  selectPaymentCardPopup: boolean
  setSelectPaymentCardPopup: (open: boolean) => void

  selectedPaymentCard: CreditCard | null
  setSelectedPaymentCard: (selected: CreditCard) => void
}

type CreditCardStoreType = UseBoundStore<StoreApi<CreditCardState>>

const createCreditCardStore: StateCreator<CreditCardState> = (
  set,
  get,
  store,
) => ({
  creditCardList: [],
  setCreditCardList: (creditCardList: CreditCard[]) => set({ creditCardList }),
  addCreditCard: (creditCard: CreditCard) => {
    set((state) => ({
      creditCardList: [...state.creditCardList, creditCard],
    }))
  },
  addCreditCardDialogOpen: false,
  setAddCreditCardDialogOpen: (open) => set({ addCreditCardDialogOpen: open }),

  refreshServicesHistory: false,
  setRefreshServicesHistory: (open) => set({ refreshServicesHistory: open }),

  servicesHistoryPopup: false,
  setServicesHistoryPopup: (open) => set({ servicesHistoryPopup: open }),

  servicesHistoryEditTransaction: null,
  setServicesHistoryEditTransaction: (selected: PatientTransactions) =>
    set({ servicesHistoryEditTransaction: selected }),

  selectCardListPopup: false,
  setSelectCardListPopup: (open) => set({ selectCardListPopup: open }),

  selectPaymentCardPopup: false,
  setSelectPaymentCardPopup: (open) => set({ selectPaymentCardPopup: open }),

  selectedPaymentCard: null,
  setSelectedPaymentCard: (selected) => set({ selectedPaymentCard: selected }),
})

export { createCreditCardStore, type CreditCardStoreType, type CreditCardState }
