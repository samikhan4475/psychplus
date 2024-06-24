'use client'

import { type StateCreator } from 'zustand'
import { HealthConcernDialogState } from '.'

const healthConcernDialogStore: StateCreator<HealthConcernDialogState> = (
  set,
) => ({
  patientId: 0,
  setPatientId: (patientId) => set({ patientId }),
  noteId: 0,
  setNoteId: (noteId) => set({ noteId }),
})

export { healthConcernDialogStore }
