'use client'

import { type StateCreator } from 'zustand'
import { ResponseHistoryFiltersState } from './types'

const initialResponseHistoryListFilterState = {
  receiverName: '',
  createdOn: undefined,
}

const responseHistoryListFilterStore: StateCreator<ResponseHistoryFiltersState> = (set) => ({
  responseHistoryFilters: initialResponseHistoryListFilterState,
  handleResponseHistoryFiltersChange: (newFilters) => {
    set((state) => ({
      responseHistoryFilters: {
        ...state.responseHistoryFilters,
        ...newFilters,
      },
    }))
  },
})

export { responseHistoryListFilterStore, initialResponseHistoryListFilterState }
