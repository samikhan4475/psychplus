'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { combineStateCreators } from '@psychplus/utils/store'
import { assessmentAndTreatmentPlanStore } from './assessment-and-treatment-plan-store'
import { AssessmentAndTreatmentPlanStoreType } from './types'

const useStore = createWithEqualityFn<AssessmentAndTreatmentPlanStoreType>(
  combineStateCreators(assessmentAndTreatmentPlanStore),
  shallow,
)

export { useStore }
