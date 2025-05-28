'use client'

import { type StateCreator } from 'zustand'
import { type PatientState } from './types'

const createPatientStore: StateCreator<PatientState> = (set) => ({
  patient: undefined,
  gMapKey: '',
  setGMapKey: (gMapKey) => set({ gMapKey }),
  setPatient: (patient) => set({ patient }),
})

export { createPatientStore }
