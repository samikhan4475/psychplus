'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { createCodeSetStore, type CodeSetState } from '@psychplus/codeset'
import { combineStateCreators } from '@psychplus/utils/store'
import { labTestsStore } from './lab-orders-store'
import { LabTestsState } from './types'

type PreferredPartnersStoreType = CodeSetState &
LabTestsState 
const useStore = createWithEqualityFn<PreferredPartnersStoreType>(
  combineStateCreators(
    labTestsStore,
    createCodeSetStore,
  ),
  shallow,
)

export { useStore, type PreferredPartnersStoreType }
