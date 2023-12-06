'use client'

import { type StateCreator, type StoreApi, type UseBoundStore } from 'zustand'
import { type PatientProfileInformation } from '../types'

interface PatientProfileInformationState {
  patientProfileInformation?: PatientProfileInformation
  getPatientProfileInformation: () => PatientProfileInformation
  setPatientProfileInformation: (patient: PatientProfileInformation) => void
}

type PatientProfileInformationStoreType = UseBoundStore<StoreApi<PatientProfileInformationState>>

const createPatientProfileInformationStore: StateCreator<PatientProfileInformationState> = (
  set,
  get,
) => ({
  getPatientProfileInformation: () => {
    const patientProfileInformation = get().patientProfileInformation

    if (!patientProfileInformation) {
      throw new Error()
    }

    return patientProfileInformation
  },
  setPatientProfileInformation: (patientProfileInformation) => set({ patientProfileInformation }),
})

export {
  type PatientProfileInformationState,
  type PatientProfileInformationStoreType,
  createPatientProfileInformationStore,
}
