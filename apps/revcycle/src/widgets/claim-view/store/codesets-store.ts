'use client'

import { type StateCreator } from 'zustand'
import { CodeSetsState } from './types'

const codeSetsStore: StateCreator<CodeSetsState> = (set) => ({
  insurancePayersList: [],
  setInsurancePayersList(list) {
    set({ insurancePayersList: list })
  },
  locations: [],
  setLocations(list) {
    set({ locations: list })
  },
  dateTypes: [],
  setDateTypes(list) {
    set({ dateTypes: list })
  },
})

export { codeSetsStore, type CodeSetsState }
