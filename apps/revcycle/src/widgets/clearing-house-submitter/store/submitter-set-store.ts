'use client'

import { createCodeSetStore } from '@psychplus/codeset'
import { type StateCreator } from 'zustand'
import { SubmitterSetState } from './types'

const clearingHouseSubmitterStore: StateCreator<SubmitterSetState> = (set, get, store) => ({
  ...createCodeSetStore(set, get, store),
  stateList: {
    codeSystemName: "",
    displayName: "",
    codes: []
  },
  citiesList: {
    codeSystemName: "",
    displayName: "",
    codes: []
  },
  practiceList: [],
  receiverList: [],
  setStateList: (stateList) => set({ stateList }),
  setCitiesList: (citiesList) => set({ citiesList }),
  setPracticeList: (practiceList) => set({ practiceList }),
  setReceiverList: (receiverList) => set({ receiverList }),
})

export { clearingHouseSubmitterStore }
