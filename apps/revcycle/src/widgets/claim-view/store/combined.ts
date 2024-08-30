'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { combineStateCreators } from '@psychplus/utils/store'
import { claimListFilterStore } from './claim-list-filter-store'
import { claimListStore } from './claim-list-store'
import { useTabsStore } from './claim-tab-store'
import { ClaimState, createClaimStore } from './codesets-states-store'
import { ClaimSubmissionStore } from './claim-submission'
import { codeSetsStore } from './codesets-store'
import {
  ClaimFiltersState,
  ClaimListState,
  CodeSetsState,
  TabsStore,
  ClaimSubmissionState,
} from './types'

type ClaimStoreType = ClaimListState &
  ClaimFiltersState &
  TabsStore &
  ClaimState &
  CodeSetsState&
    ClaimSubmissionState

const useStore = createWithEqualityFn<ClaimStoreType>(
  combineStateCreators(
    claimListStore,
    claimListFilterStore,
    useTabsStore,
    createClaimStore,
    codeSetsStore,
    ClaimSubmissionStore,
  ),
  shallow,
)

export { useStore, type ClaimStoreType }
