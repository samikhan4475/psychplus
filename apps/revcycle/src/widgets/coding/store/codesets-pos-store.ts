'use client'

import { type StateCreator } from 'zustand'
import { MetaDataCodeSet } from '@/widgets/coding-cpt/types'

interface POSCodeSetsState {
  posCodeSets: MetaDataCodeSet[]
  cptCategoryCodeSets: MetaDataCodeSet[]
  setCodingPosCodeSets: (codes: MetaDataCodeSet[]) => void
  setCodingCptCategoryCodeSets: (codes: MetaDataCodeSet[]) => void
}

const createPOSCodeSetsStore: StateCreator<POSCodeSetsState> = (set) => ({
  posCodeSets: [],
  setCodingPosCodeSets: (posCodeSets: MetaDataCodeSet[]) =>set({ posCodeSets }),
  cptCategoryCodeSets: [],
  setCodingCptCategoryCodeSets: (cptCategoryCodeSets: MetaDataCodeSet[]) =>set({ cptCategoryCodeSets }),
})

export { createPOSCodeSetsStore, type POSCodeSetsState }
