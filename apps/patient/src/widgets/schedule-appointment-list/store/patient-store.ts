'use client'

import { type StateCreator } from 'zustand'
import { type PatientState } from './types'

const createPatientStore: StateCreator<PatientState> = (set) => ({
  patient: undefined,
  address: undefined,
  setPatient: (patient) => set({ patient }),
  setAddress: (address) => set({ address }),
})

export { createPatientStore }
