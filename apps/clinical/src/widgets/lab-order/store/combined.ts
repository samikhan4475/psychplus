'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { createCodeSetStore, type CodeSetState } from '@psychplus/codeset'
import { combineStateCreators } from '@psychplus/utils/store'
import { labOrdersStore } from './lab-order-store'
import { LabOrderState } from './types'
import { StateCreator } from 'zustand'
import { LabOrder, LabTest } from '../types'
import { Code } from '@psychplus/lab-orders/types'

type LabOrdersStoreType = CodeSetState & LabOrderState & State

interface State {
  labOrders: LabOrder[]
  setLabOrders: (value: LabOrder[]) => void
  tests: LabTest[],
  setTests: (tests: LabTest[]) => void,
  resultFlags: Code[]
  resultStatus: Code[]
  setResultFlags: (resultFlags: Code[]) => void
  setResultStatus: (resultStatus: Code[]) => void
}

const createStore: StateCreator<State> = (set) => ({
  labOrders: [],
  setLabOrders: (labOrders) => set({ labOrders }),
  tests: [],
  setTests: (tests) => set({ tests }),
  resultFlags: [],
  resultStatus: [],
  setResultFlags: (resultFlags) => set({ resultFlags }),
  setResultStatus: (resultStatus) => set({ resultStatus }),
});

const useStore = createWithEqualityFn<LabOrdersStoreType>(
  combineStateCreators(
    createStore,
    createCodeSetStore,
    labOrdersStore
  ),
  shallow,
)

export { useStore, type LabOrdersStoreType }
