'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { combineStateCreators } from '@psychplus/utils/store'
import {
  createUsStatesCodeSetsStore,
  UsStatesCodeSetsState,
} from './codesets-states-store'

type ClearingHouseStoreType = UsStatesCodeSetsState

const useStore = createWithEqualityFn<ClearingHouseStoreType>(
  combineStateCreators(createUsStatesCodeSetsStore),
  shallow,
)

export { useStore, type ClearingHouseStoreType }
