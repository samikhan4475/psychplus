'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { combineStateCreators } from '@psychplus/utils/store'
import { claimListFilterStore } from './claim-list-filter-store'
import { claimListStore } from './claim-list-store'
import { ClaimFiltersState, ClaimListState } from './types'

type ClaimStoreType = ClaimListState & ClaimFiltersState

const useStore = createWithEqualityFn<ClaimStoreType>(
  combineStateCreators(claimListStore, claimListFilterStore),
  shallow,
)

export { useStore, type ClaimStoreType }
