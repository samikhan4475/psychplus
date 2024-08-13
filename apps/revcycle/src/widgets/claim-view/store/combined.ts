'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { combineStateCreators } from '@psychplus/utils/store'
import { claimListFilterStore } from './claim-list-filter-store'
import { claimListStore } from './claim-list-store'
import { codeSetsStore } from './codesets-store'
import { ClaimFiltersState, ClaimListState, CodeSetsState } from './types'

type ClaimStoreType = ClaimListState & ClaimFiltersState & CodeSetsState

const useStore = createWithEqualityFn<ClaimStoreType>(
  combineStateCreators(claimListStore, claimListFilterStore, codeSetsStore),
  shallow,
)

export { useStore, type ClaimStoreType }
