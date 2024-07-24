'use client'

import { type StateCreator } from 'zustand'
import { StatesOption } from '../types'

interface UsStatesCodeSetsState {
  usStatesCodeSets: StatesOption[]
  setUsStatesCodeSets: (codes: StatesOption[]) => void
}

const createUsStatesCodeSetsStore: StateCreator<UsStatesCodeSetsState> = (
  set,
) => ({
  usStatesCodeSets: [],
  setUsStatesCodeSets: (usStatesCodeSets: StatesOption[]) =>
    set({ usStatesCodeSets }),
})

export { createUsStatesCodeSetsStore, type UsStatesCodeSetsState }
