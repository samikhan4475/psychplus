'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { combineStateCreators } from '@psychplus/utils/store'
import { CarePlanState, RealCodeSetState } from '.'
import { carePlanStore, realCodeSetStore } from './care-plan-store'

type CarePlanStoreType = CarePlanState & RealCodeSetState

const useStore = createWithEqualityFn<CarePlanStoreType>(
  combineStateCreators(carePlanStore, realCodeSetStore),
  shallow,
)

export { useStore }
