'use client'

import { type StateCreator } from 'zustand'
import { MetaDataCodeSet } from '../types'

interface POSCodeSetsState {
  posCodeSets: MetaDataCodeSet[]
  setCodingPosCodeSets: (codes: MetaDataCodeSet[]) => void
}

const createPOSCodeSetsStore: StateCreator<POSCodeSetsState> = (set) => ({
  posCodeSets: [],
  setCodingPosCodeSets: (posCodeSets: MetaDataCodeSet[]) =>
    set({ posCodeSets }),
})

export { createPOSCodeSetsStore, type POSCodeSetsState }
