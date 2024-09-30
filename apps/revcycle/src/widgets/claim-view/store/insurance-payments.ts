'use client'

import { type StateCreator } from 'zustand'
import { InsurancePaymentsState } from './types'

const InsurancePaymentStore: StateCreator<InsurancePaymentsState> = (set) => ({
  insurancePaymentsList: [],
  setInsurancePaymentsList(data) {
    set({ insurancePaymentsList: data })
  },
  insurancePaymentModalOpen: false,
  setInsurancePaymentModalOpen(open) {
    set({ insurancePaymentModalOpen: open })
  },
  insurancePaymentEditData: null,
  setInsurancePaymentEditData(open) {
    set({ insurancePaymentEditData: open })
  },
  insurancePaymentRefetchData: false,
  setInsurancePaymentRefetchData(refresh) {
    set({ insurancePaymentRefetchData: refresh })
  },
})

export { InsurancePaymentStore, type InsurancePaymentsState }
