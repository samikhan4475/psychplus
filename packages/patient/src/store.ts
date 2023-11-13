'use client'

import { type StateCreator, type StoreApi, type UseBoundStore } from 'zustand'
import { type Patient } from './types'

interface PatientState {
  patient?: Patient
  setPatient: (patient: Patient) => void
}

type PatientStoreType = UseBoundStore<StoreApi<PatientState>>

const createPatientStore: StateCreator<PatientState> = (set, get) => ({
  patient: undefined,
  setPatient: (patient) => set({ patient }),
})

export { type PatientState, type PatientStoreType, createPatientStore }
