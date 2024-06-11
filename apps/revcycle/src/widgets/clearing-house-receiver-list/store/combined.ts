'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { combineStateCreators } from '@psychplus/utils/store'
import { clearingHouseReceiverFilterStore } from './clearing-house-receiver-filter-store'
import { clearingHouseReceiverStore } from './clearing-house-receiver-store'
import {
  ClearingHouseReceiverFiltersState,
  ClearingHouseReceiverState,
} from './types'

type ClearingHouseReceiverStoreType = ClearingHouseReceiverState &
  ClearingHouseReceiverFiltersState

const useStore = createWithEqualityFn<ClearingHouseReceiverStoreType>(
  combineStateCreators(
    clearingHouseReceiverStore,
    clearingHouseReceiverFilterStore,
  ),
  shallow,
)

export { useStore, type ClearingHouseReceiverStoreType }
