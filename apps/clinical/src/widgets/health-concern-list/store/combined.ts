'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { createCodeSetStore } from '@psychplus/codeset'
import { combineStateCreators } from '@psychplus/utils/store'
import { HealthConcernsStoreType } from '.'
import { healthConcernStore } from './health-concern-store'

const useStore = createWithEqualityFn<HealthConcernsStoreType>(
  combineStateCreators(createCodeSetStore, healthConcernStore),
  shallow,
)

export { useStore }
