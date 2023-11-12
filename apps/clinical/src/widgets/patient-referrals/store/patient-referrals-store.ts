'use client'

import { type StateCreator, type StoreApi, type UseBoundStore } from 'zustand'
import { type PatientReferral } from '../types'

interface PatientReferralState {
  referrals?: PatientReferral[]
  getReferrals: () => PatientReferral[]
  setReferrals: (patient: PatientReferral[]) => void
}

type PatientReferralStoreType = UseBoundStore<StoreApi<PatientReferralState>>

const createPatientReferralStore: StateCreator<PatientReferralState> = (
  set,
  get,
) => ({
  getReferrals: () => {
    const referrals = get().referrals

    if (!referrals) {
      throw new Error()
    }

    return referrals
  },
  setReferrals: (referrals) => set({ referrals }),
})

export {
  type PatientReferralState,
  type PatientReferralStoreType,
  createPatientReferralStore,
}
