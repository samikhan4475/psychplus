'use client'

import { type StateCreator } from 'zustand'
import { HealthConcernState } from '.'

const healthConcernStore: StateCreator<HealthConcernState> = (set) => ({
  healthConcerns: [],
  setHealthConcerns: (healthConcerns) => set({ healthConcerns }),
  patientId: 0,
  setPatientId: (patientId) => set({ patientId }),
  noteId: 0,
  setNoteId: (noteId) => set({ noteId }),
})

export { healthConcernStore }
