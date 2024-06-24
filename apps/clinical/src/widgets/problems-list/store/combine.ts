'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { combineStateCreators } from '@psychplus/utils/store'
import { problemFilterStore } from './problem-filter-store'
import { problemStore, realCodeSetStore } from './problem-store'
import { ProblemFiltersState, ProblemState, RealCodeSetState } from './types'

type PreferredPartnersStoreType = RealCodeSetState &
  ProblemFiltersState &
  ProblemState

const useStore = createWithEqualityFn<PreferredPartnersStoreType>(
  combineStateCreators(problemStore, problemFilterStore, realCodeSetStore),
  shallow,
)

export { useStore, type PreferredPartnersStoreType }
