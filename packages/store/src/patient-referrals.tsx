'use client'

import { useRef } from 'react'
import type { StateCreator, StoreApi, UseBoundStore } from 'zustand'
import type { PatientReferral } from '@psychplus/types'

interface PatientReferralsState {
  referrals?: PatientReferral[]
  getReferrals: () => PatientReferral[]
  setReferrals: (patient: PatientReferral[]) => void
}

type StoreType = UseBoundStore<StoreApi<PatientReferralsState>>

const createPatientReferralsStore: StateCreator<PatientReferralsState> = (
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

  if (!loaded.current) {
    loaded.current = true

    const setters = store.map((s) => s((state) => state.setReferrals))
    setters.forEach((set) => set(referrals))
  }

  return null
}

export {
  type PatientReferralsState,
  createPatientReferralsStore,
  PatientReferralsPreloader,
}
