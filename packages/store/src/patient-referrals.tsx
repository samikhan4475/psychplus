'use client'

import { useRef } from 'react'
import type { StateCreator, StoreApi, UseBoundStore } from 'zustand'
import type { PatientReferral } from '@psychplus/types'

interface PatientReferralState {
  referrals?: PatientReferral[]
  getReferrals: () => PatientReferral[]
  setReferrals: (patient: PatientReferral[]) => void
}

type StoreType = UseBoundStore<StoreApi<PatientReferralState>>

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

const PatientReferralsPreloader = ({
  referrals,
  store,
}: {
  referrals: PatientReferral[]
  store: StoreType[]
}) => {
  const loaded = useRef(false)
  const setters = store.map((s) => s((state) => state.setReferrals))

  if (!loaded.current) {
    loaded.current = true
    setters.forEach((set) => set(referrals))
  }

  return null
}

export {
  type PatientReferralState,
  createPatientReferralStore,
  PatientReferralsPreloader,
}
