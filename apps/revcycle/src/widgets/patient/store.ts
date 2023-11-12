'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { createPatientStore, type PatientState } from '@psychplus/patient'
import { combineStateCreators } from '@psychplus/utils/store'

type StoreType = PatientState

const useStore = createWithEqualityFn<StoreType>(
  combineStateCreators(createPatientStore),
  shallow,
)

export { useStore }
