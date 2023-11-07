'use client'

import { create } from 'zustand'
import { createPatientStore, type PatientState } from '@psychplus/store/patient'
import {
  createPatientReferralsStore,
  type PatientReferralsState,
} from '@psychplus/store/patient-referrals'
import { createUserStore, type UserState } from '@psychplus/store/user'

const useStore = create<UserState & PatientState & PatientReferralsState>()(
  (...a) => ({
    ...createUserStore(...a),
    ...createPatientStore(...a),
    ...createPatientReferralsStore(...a),
  }),
)

export { useStore }
