'use client'

import { useRef } from 'react'
import { type StoreApi, type UseBoundStore } from 'zustand'
import { CodeSet } from '@psychplus/codeset'
import { Patient } from '@psychplus/patient'
import { PatientStoreType } from './store'

type BoundStoreType = UseBoundStore<StoreApi<PatientStoreType>>

interface PreloaderProps {
  store: BoundStoreType
  patients: Patient[]
  preferredPartnerId: string
  codeSets: CodeSet[]
}

const Preloader = ({
  store,
  patients,
  preferredPartnerId,
  codeSets,
}: PreloaderProps) => {
  const loaded = useRef(false)

  const { setPatients, setPreferredPartnerId, setCodeSets } = store(
    (state) => ({
      setPatients: state.setPatients,
      setCodeSets: state.setCodeSets,
      setPreferredPartnerId: state.setPreferredPartnerId,
    }),
  )

  if (!loaded.current) {
    loaded.current = true
    setPatients(patients)
    setPreferredPartnerId(preferredPartnerId)
    setCodeSets(codeSets)
  }

  return null
}

export { Preloader }
