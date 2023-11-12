'use client'

import { useRef } from 'react'
import { type PatientReferral } from '../types'
import { PatientReferralStoreType } from './patient-referrals-store'

const PatientReferralsPreloader = ({
  referrals,
  store,
}: {
  referrals: PatientReferral[]
  store: PatientReferralStoreType[]
}) => {
  const loaded = useRef(false)
  const setters = store.map((s) => s((state) => state.setReferrals))

  if (!loaded.current) {
    loaded.current = true
    setters.forEach((set) => set(referrals))
  }

  return null
}

export { PatientReferralsPreloader }
