'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { createPatientStore, type PatientState } from '@psychplus/store/patient'
import {
  createPatientReferralStore,
  type PatientReferralState,
} from '@psychplus/store/patient-referrals'
import { createUserStore, type UserState } from '@psychplus/store/user'
import { combineStateCreators } from '@psychplus/store/utils'

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
