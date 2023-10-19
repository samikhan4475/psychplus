'use client'

import { useRef } from 'react'
import type { StateCreator, StoreApi, UseBoundStore } from 'zustand'
import type { Patient } from '@psychplus/types'

interface PatientState {
  patient?: Patient
  setPatient: (patient: Patient) => void
}

type StoreType = UseBoundStore<StoreApi<PatientState>>

const createPatientStore: StateCreator<PatientState> = (set) => ({
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

const getPatient = (store: StoreType) => {
  const patient = store((state) => state.patient)

  if (!patient) {
    throw new Error()
  }

  return patient
}

export { type PatientState, createPatientStore, PatientPreloader, getPatient }
