'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { combineStateCreators } from '@psychplus/utils/store'
import { claimListFilterStore } from './claim-list-filter-store'
import { claimListStore } from './claim-list-store'
import { ClaimSubmissionStore } from './claim-submission'
import { useTabsStore } from './claim-tab-store'
import { ClaimState, createClaimStore } from './codesets-states-store'
import { codeSetsStore } from './codesets-store'
import { InsurancePaymentStore } from './insurance-payments'
import { responseHistoryListFilterStore } from './response-history-list-filter-store'
import { responseHistoryListStore } from './response-history-list-store'
import {
  ClaimFiltersState,
  ClaimListState,
  ClaimSubmissionState,
  CodeSetsState,
  InsurancePaymentsState,
  ResponseHistoryFiltersState,
  ResponseHistoryListState,
  TabsStore,
} from './types'

type ClaimStoreType = ClaimListState &
  ClaimFiltersState &
  TabsStore &
  ClaimState &
  CodeSetsState &
  ClaimSubmissionState &
  InsurancePaymentsState &
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
    InsurancePaymentStore,
    responseHistoryListStore,
    responseHistoryListFilterStore,
  ),
  shallow,
)

export { useStore, type ClaimStoreType }
