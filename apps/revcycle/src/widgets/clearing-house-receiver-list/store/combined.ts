'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { combineStateCreators } from '@psychplus/utils/store'
import { clearingHouseReceiverFilterStore } from './clearing-house-receiver-filter-store'
import { clearingHouseReceiverStore } from './clearing-house-receiver-store'
import {
  createUsStatesCodeSetsStore,
  UsStatesCodeSetsState,
} from './codesets-states-store'
import {
  ClearingHouseReceiverFiltersState,
  ClearingHouseReceiverState,
} from './types'

type ClearingHouseReceiverStoreType = ClearingHouseReceiverState &
  ClearingHouseReceiverFiltersState &
  UsStatesCodeSetsState

const useStore = createWithEqualityFn<ClearingHouseReceiverStoreType>(
  combineStateCreators(
    clearingHouseReceiverStore,
    clearingHouseReceiverFilterStore,
    createUsStatesCodeSetsStore,
  ),
  shallow,
)

export { useStore, type ClearingHouseReceiverStoreType }
