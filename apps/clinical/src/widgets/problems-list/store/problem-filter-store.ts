'use client'

import { type StateCreator } from 'zustand'
import { ProblemFiltersState } from '.'

const initialProblemFilterState = {
  problemType: '',
  symptomCodesetUsed: '',
  symptomCode: '',
  severity: '',
  activeStatus: '',
  problemDate: '',
}

const problemFilterStore: StateCreator<ProblemFiltersState> = (set) => ({
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

export { problemFilterStore, initialProblemFilterState }
