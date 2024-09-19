'use client'

import { type StateCreator } from 'zustand'
import { createCodeSetStore } from '@psychplus/codeset'
import { SubmitterSetState } from './types'

const clearingHouseSubmitterStore: StateCreator<SubmitterSetState> = (
  set,
  get,
  store,
) => ({
  ...createCodeSetStore(set, get, store),
  receiverList: [],
  insurancePayerList: [],
  ediRecords: [],
  insurancePayerOptions: [],
  receiverOptions: [],
  setReceiverList: (receiverList) => set({ receiverList }),
  setInsurancePayerList: (insurancePayerList) => set({ insurancePayerList }),
  setEDIRecords: (ediRecords) => set({ ediRecords }),
  setInsurancePayerOptions: (insurancePayerOptions) => set({ insurancePayerOptions }),
  setReceiverOptions: (receiverOptions) => set({ receiverOptions }),
})

export { clearingHouseSubmitterStore, type SubmitterSetState }
