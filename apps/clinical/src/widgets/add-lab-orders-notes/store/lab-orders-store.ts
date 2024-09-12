'use client'

import { type StateCreator } from 'zustand'
import { createCodeSetStore } from '@psychplus/codeset'
import { GetDropdown } from './hooks'
import { LabTestsState } from './types'

const labTestsStore: StateCreator<LabTestsState> = (
  set,
  get,
  store,
) => ({
  ...createCodeSetStore(set, get, store),
  labOrders: [],
  tests: [],
  setLabOrders: (labOrders) => set({ labOrders }),
  setTests: (tests) => set({ tests }),
  getDropdowns: (key) => GetDropdown(key) || [],
  resultFlags: [],
  resultStatus: [],
  resultUnits: [],
  setResultFlags: (resultFlags) => set({ resultFlags }),
  setResultStatus: (resultStatus) => set({ resultStatus }),
  setResultUnits: (resultUnits) => set({ resultUnits }),
})

export { labTestsStore }