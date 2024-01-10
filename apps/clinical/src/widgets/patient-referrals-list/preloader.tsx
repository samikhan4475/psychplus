'use client'

import { useRef } from 'react'
import { type StoreApi, type UseBoundStore } from 'zustand'
import { type CodeSet } from '@psychplus/codeset'
import { type Patient } from '@psychplus/patient'
import type { Referral } from '@psychplus/referrals'
import { type User } from '@psychplus/user'
import { type ReferralsStoreType } from './store'

type BoundStoreType = UseBoundStore<StoreApi<ReferralsStoreType>>

interface PreloaderProps {
  store: BoundStoreType
  user: User
  patient: Patient
  codeSets: CodeSet[]
  referrals: Referral[]
}

const Preloader = ({
  store,
  user,
  patient,
  codeSets,
  referrals,
}: PreloaderProps) => {
  const loaded = useRef(false)

  const { setUser, setPatient, setCodeSets, setReferrals } = store((state) => ({
    setUser: state.setUser,
    setPatient: state.setPatient,
    setCodeSets: state.setCodeSets,
    setReferrals: state.setReferrals,
  }))

  if (!loaded.current) {
    loaded.current = true
    setUser(user)
    setPatient(patient)
    setCodeSets(codeSets)
    setReferrals(referrals)
  }

  return null
}

export { Preloader }
