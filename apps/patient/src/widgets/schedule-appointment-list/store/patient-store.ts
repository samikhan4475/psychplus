'use client'

import { type StateCreator } from 'zustand'
import { type PatientState } from './types'

const createPatientStore: StateCreator<PatientState> = (set) => ({
  patient: undefined,
  setPatient: (patient) => set({ patient }),
})

export { createPatientStore }
