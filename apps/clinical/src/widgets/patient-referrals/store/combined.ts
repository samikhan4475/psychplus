'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { createPatientStore, type PatientState } from '@psychplus/patient'
import { createUserStore, type UserState } from '@psychplus/user'
import { combineStateCreators } from '@psychplus/utils/store'
import {
  createPatientReferralStore,
  type PatientReferralState,
} from './patient-referrals-store'

type StoreType = UserState & PatientState & PatientReferralState

const useStore = createWithEqualityFn<StoreType>(
  combineStateCreators(
    createUserStore,
    createPatientStore,
    createPatientReferralStore,
  ),
  shallow,
)

export { useStore }
