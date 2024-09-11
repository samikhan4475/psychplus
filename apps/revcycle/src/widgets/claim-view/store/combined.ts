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
  ResponseHistoryListState,
  ResponseHistoryFiltersState
} from './types'
import { responseHistoryListStore } from './response-history-list-store'
import { responseHistoryListFilterStore } from './response-history-list-filter-store'

type ClaimStoreType = ClaimListState &
  ClaimFiltersState &
  TabsStore &
  ClaimState &
  CodeSetsState&
    ClaimSubmissionState &
    ResponseHistoryListState &
    ResponseHistoryFiltersState

const useStore = createWithEqualityFn<ClaimStoreType>(
  combineStateCreators(
    claimListStore,
    claimListFilterStore,
    useTabsStore,
    createClaimStore,
    codeSetsStore,
    ClaimSubmissionStore,
    responseHistoryListStore,
    responseHistoryListFilterStore
  ),
  shallow,
)

export { useStore, type ClaimStoreType }
