'use client'

import { useRef } from 'react'
import { type StoreApi, type UseBoundStore } from 'zustand'
import { type User } from '@psychplus/user'
import { type PreferredPartnersStoreType } from './store'
import { PatientPreferredPartner } from './types'

type BoundStoreType = UseBoundStore<StoreApi<PreferredPartnersStoreType>>

interface PreloaderProps {
  store: BoundStoreType
  user: User
  patientPreferredPartners: PatientPreferredPartner[]
}

const Preloader = ({ store, user, patientPreferredPartners }: PreloaderProps) => {
  const loaded = useRef(false)

  const { setUser, setPatientPreferredPartners } = store((state) => ({
    setUser: state.setUser,
    setPatientPreferredPartners: state.setPatientPreferredPartners,
  }))

  if (!loaded.current) {
    loaded.current = true
    setUser(user)
    setPatientPreferredPartners(patientPreferredPartners)
  }

  return null
}

export { Preloader }
