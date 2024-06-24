'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { combineStateCreators } from '@psychplus/utils/store'
import { HealthConcernsDialogStoreType } from '.'
import { healthConcernDialogStore } from './health-concern-dialog-store'

const useStore = createWithEqualityFn<HealthConcernsDialogStoreType>(
  combineStateCreators(healthConcernDialogStore),
  shallow,
)

export { useStore }
