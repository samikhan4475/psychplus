'use client'

import { type StateCreator } from 'zustand'
import { CodeSetStoreState } from '../types'

const createSelfSchedulingStore: StateCreator<CodeSetStoreState> = (set) => ({
  languageCodeSet: undefined,
  specialistTypeCodeSet: undefined,
  staff: undefined,

  setCodeSets: (languageCodeSet, specialistTypeCodeSet) =>
    set({ languageCodeSet, specialistTypeCodeSet }),

  setStaff: (staff) => set({ staff }),
})

export { createSelfSchedulingStore }
