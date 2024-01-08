'use client'

import { useRef } from 'react'
import { type PatientProfileInformation } from '../types'
import { PatientProfileInformationStoreType } from './patient-information-store'

const PatientInformationPreloader = ({
  patientProfileInformation,
  store,
}: {
  patientProfileInformation: PatientProfileInformation
  store: PatientProfileInformationStoreType[]
}) => {
  const loaded = useRef(false)
  const setters = store.map((s) =>
    s((state) => state.setPatientProfileInformation),
  )

  if (!loaded.current) {
    loaded.current = true
    setters.forEach((set) => set(patientProfileInformation))
  }

  return null
}

export { PatientInformationPreloader }
