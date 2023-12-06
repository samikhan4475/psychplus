'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { createUserStore, type UserState } from '@psychplus/user'
import { combineStateCreators } from '@psychplus/utils/store'
import {
  createPatientLookupStore,
  type PatientLookupState,
} from './patient-lookup-store'

type StoreType = UserState & PatientLookupState

const useStore = createWithEqualityFn<StoreType>(
  combineStateCreators(createUserStore, createPatientLookupStore),
  shallow,
)

export { useStore }
