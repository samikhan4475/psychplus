'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { combineStateCreators } from '@psychplus/utils/store'
import { claimListFilterStore } from './claim-list-filter-store'
import { claimListStore } from './claim-list-store'
import { ClaimSubmissionStore } from './claim-submission'
import { codeSetsStore } from './codesets-store'
import {
  ClaimFiltersState,
  ClaimListState,
  ClaimSubmissionState,
  CodeSetsState,
} from './types'

type ClaimStoreType = ClaimListState &
  ClaimFiltersState &
  CodeSetsState &
  ClaimSubmissionState

const useStore = createWithEqualityFn<ClaimStoreType>(
  combineStateCreators(
    claimListStore,
    claimListFilterStore,
    codeSetsStore,
    ClaimSubmissionStore,
  ),
  shallow,
)

export { useStore, type ClaimStoreType }
