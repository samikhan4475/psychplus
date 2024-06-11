'use client'

import { type StateCreator } from 'zustand'
import { ClearingHouseReceiverFiltersState } from './types'

const initialClearingHouseReceiverFilterState = {
  receiverIds: [],
  clearingHouseName: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
  phone: '',
  fax: '',
  email: '',
  receiverId: '',
  receiverName: '',
}

const clearingHouseReceiverFilterStore: StateCreator<
  ClearingHouseReceiverFiltersState
> = (set) => ({
  filters: initialClearingHouseReceiverFilterState,
  handleFiltersChange: (newFilters) => {
    set((state) => ({
      filters: {
        ...state.filters,
        ...newFilters,
      },
    }))
  },
})

export {
  clearingHouseReceiverFilterStore,
  initialClearingHouseReceiverFilterState,
}
