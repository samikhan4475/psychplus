'use client'

import { type StateCreator } from 'zustand'
import { FunctionalCognitiveFiltersState } from '.'

const initialProblemFilterState = {
  historyType: '',
  symptomCode: '',
  activeStatus: '',
  effectiveDate: '',
}

const functionalCognitiveFilterStore: StateCreator<
  FunctionalCognitiveFiltersState
> = (set) => ({
  filters: initialProblemFilterState,
  handleFiltersChange: (newFilters) => {
    set((state) => ({
      filters: {
        ...state.filters,
        ...newFilters,
      },
    }))
  },
})

export { functionalCognitiveFilterStore }
