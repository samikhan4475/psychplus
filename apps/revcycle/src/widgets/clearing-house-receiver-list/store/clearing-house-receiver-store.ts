'use client'

import { type StateCreator } from 'zustand'
import { ClearingHouseReceiverState } from './types'

const clearingHouseReceiverStore: StateCreator<ClearingHouseReceiverState> = (
  set,
  get,
) => ({
  clearingHouseReceivers: [],
  setClearingHouseReceivers(receivers) {
    set({ clearingHouseReceivers: receivers })
  },
})

export { clearingHouseReceiverStore, type ClearingHouseReceiverState }
