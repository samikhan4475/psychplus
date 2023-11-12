'use client'

import { useRef } from 'react'
import { type PatientStoreType } from './store'
import { type Patient } from './types'

const PatientPreloader = ({
  patient,
  store,
}: {
  patient: Patient
  store: PatientStoreType[]
}) => {
  const loaded = useRef(false)
  const setters = store.map((s) => s((state) => state.setPatient))

  if (!loaded.current) {
    loaded.current = true
    setters.forEach((set) => set(patient))
  }

  return null
}

export { PatientPreloader }
