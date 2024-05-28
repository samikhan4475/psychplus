'use client'

import { type StateCreator } from 'zustand'
import { PreferredPartnerFiltersState } from './types'

const initialPreferredPartnerFilterState = {
  name: '',
  city: '',
  subscriptionStatusList: [],
  dateFrom: '',
  dateTo: '',
}

const preferredPartnerFilterStore: StateCreator<
  PreferredPartnerFiltersState
> = (set) => ({
  filters: initialPreferredPartnerFilterState,
  handleFiltersChange: (newFilters) => {
    set((state) => ({
      filters: {
        ...state.filters,
        ...newFilters,
      },
    }))
  },
})

export { preferredPartnerFilterStore, initialPreferredPartnerFilterState }
