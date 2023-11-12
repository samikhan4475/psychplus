'use client'

import { type StateCreator, type StoreApi, type UseBoundStore } from 'zustand'
import { type Patient } from './types'

interface PatientState {
  patient?: Patient
  getPatient: () => Patient
  setPatient: (patient: Patient) => void
}

type PatientStoreType = UseBoundStore<StoreApi<PatientState>>

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

export { type PatientState, type PatientStoreType, createPatientStore }
