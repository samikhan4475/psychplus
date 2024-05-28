'use client'

import { useRef } from 'react'
import { type StoreApi, type UseBoundStore } from 'zustand'
import { Patient } from '@psychplus/patient'
import { PreferredPartner } from '@psychplus/preferred-partners'
import { PatientStoreType } from './store'

type BoundStoreType = UseBoundStore<StoreApi<PatientStoreType>>

interface PreloaderProps {
  store: BoundStoreType
  patients: Patient[]
  preferredPartnerId: string
  preferredPartner: PreferredPartner[]
}

const Preloader = ({
  store,
  preferredPartnerId,
  patients,
  preferredPartner,
}: PreloaderProps) => {
  const loaded = useRef(false)

  const { setPreferredPartnerId, setPatients, setPreferredPartner } = store(
    (state) => ({
      setPreferredPartnerId: state.setPreferredPartnerId,
      setPatients: state.setPatients,
      setPreferredPartner: state.setPreferredPartner,
    }),
  )

  if (!loaded.current) {
    loaded.current = true
    setPreferredPartnerId(preferredPartnerId)
    setPatients(patients)
    setPreferredPartner(preferredPartner)
  }

  return null
}

export { Preloader }
