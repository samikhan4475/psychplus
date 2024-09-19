'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { combineStateCreators } from '@psychplus/utils/store'
import {
  createUsStatesCodeSetsStore,
  UsStatesCodeSetsState,
} from './codesets-states-store'
import {
  clearingHouseSubmitterStore,
  SubmitterSetState,
} from './submitter-set-store'

type ClearingHouseStoreType = UsStatesCodeSetsState & SubmitterSetState

const useStore = createWithEqualityFn<ClearingHouseStoreType>(
  combineStateCreators(
    createUsStatesCodeSetsStore,
    clearingHouseSubmitterStore,
  ),
  shallow,
)

export { useStore, type ClearingHouseStoreType }
