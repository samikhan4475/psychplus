'use client'

import { useRef } from 'react'
import type { StateCreator, StoreApi, UseBoundStore } from 'zustand'
import type { Patient } from '@psychplus/types'

interface PatientState {
  patient?: Patient
  getPatient: () => Patient
  setPatient: (patient: Patient) => void
}

type StoreType = UseBoundStore<StoreApi<PatientState>>

const createPatientStore: StateCreator<PatientState> = (set, get) => ({
  getPatient: () => {
    const patient = get().patient

    if (!patient) {
      throw new Error()
    }

    return patient
  },
  setPatient: (patient) => set({ patient }),
})

const PatientPreloader = ({
  patient,
  store,
}: {
  patient: Patient
  store: StoreType[]
}) => {
  const loaded = useRef(false)
  const setters = store.map((s) => s((state) => state.setPatient))

  if (!loaded.current) {
    loaded.current = true
    setters.forEach((set) => set(patient))
  }

  return null
}

export { type PatientState, createPatientStore, PatientPreloader }
