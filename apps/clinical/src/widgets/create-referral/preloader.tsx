'use client'

import { useRef } from 'react'
import { type StoreApi, type UseBoundStore } from 'zustand'
import { type CodeSet } from '@psychplus/codeset'
import { type Patient } from '@psychplus/patient'
import { type Staff, type User } from '@psychplus/user'
import { type StoreType } from './store'
import type { Referral } from './types'

type BoundStoreType = UseBoundStore<StoreApi<StoreType>>

interface PreloaderProps {
  store: BoundStoreType
  user: User
  staff: Staff
  patient: Patient
  codeSets: CodeSet[]
  referrals: Referral[]
}

const Preloader = ({
  store,
  user,
  staff,
  patient,
  codeSets,
  referrals,
}: PreloaderProps) => {
  const loaded = useRef(false)

  const { setUser, setStaff, setPatient, setCodeSets, setReferrals } = store(
    (state) => ({
      setUser: state.setUser,
      setStaff: state.setStaff,
      setPatient: state.setPatient,
      setCodeSets: state.setCodeSets,
      setReferrals: state.setReferrals,
    }),
  )

  if (!loaded.current) {
    loaded.current = true
    setUser(user)
    setStaff(staff)
    setPatient(patient)
    setCodeSets(codeSets)
    setReferrals(referrals)
  }

  return null
}

export { Preloader }
