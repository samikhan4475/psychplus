'use client'

import { type StateCreator, type StoreApi, type UseBoundStore } from 'zustand'
import { CareTeam, type Patient } from './types'

interface PatientState {
  patient?: Patient
  patientCareTeam?: CareTeam
  setPatient: (patient: Patient) => void
  setPatientCareTeam: (careTeam: CareTeam) => void
}

type PatientStoreType = UseBoundStore<StoreApi<PatientState>>

const createPatientStore: StateCreator<PatientState> = (set) => ({
  patient: undefined,
  patientCareTeam: undefined,

  setPatient: (patient) => set({ patient }),
  setPatientCareTeam: (patientCareTeam) => set({ patientCareTeam }),
})

export { type PatientState, type PatientStoreType, createPatientStore }
