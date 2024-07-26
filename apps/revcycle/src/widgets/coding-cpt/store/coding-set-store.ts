'use client'

import { type StateCreator } from 'zustand'
import { createCodeSetStore } from '@psychplus/codeset'
import { CodingCPTSetState } from './types'

const codingCPTStore: StateCreator<CodingCPTSetState> = (set, get, store) => ({
  ...createCodeSetStore(set, get, store),
  feeScheduleCategoryList: [],
  codingPosList: [],
  setFeeScheduleCategoryCodeSets: (feeScheduleCategoryList) => set({ feeScheduleCategoryList }),
  setCodingPosCodeSets: (codingPosList) => set({ codingPosList }),
})

export { codingCPTStore }
