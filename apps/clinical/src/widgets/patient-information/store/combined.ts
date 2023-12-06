'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { createPatientStore, type PatientState } from '@psychplus/patient'
import { createUserStore, type UserState } from '@psychplus/user'
import { combineStateCreators } from '@psychplus/utils/store'
import {
  createPatientProfileInformationStore,
  type PatientProfileInformationState,
} from './patient-information-store'

type StoreType = UserState & PatientState & PatientProfileInformationState

const useStore = createWithEqualityFn<StoreType>(
  combineStateCreators(
    createUserStore,
    createPatientStore,
    createPatientProfileInformationStore,
  ),
  shallow,
)

export { useStore }
