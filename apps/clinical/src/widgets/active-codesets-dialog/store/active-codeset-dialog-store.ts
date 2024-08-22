'use client'

import { type StateCreator } from 'zustand'
import { ActiveCodeSetDialogState } from '.'

const activeCodeSetDialogStore: StateCreator<ActiveCodeSetDialogState> = (
  set,
) => ({
  patientId: 0,
  setPatientId: (patientId) => set({ patientId }),
  noteId: 0,
  setNoteId: (noteId) => set({ noteId }),
})

export { activeCodeSetDialogStore }
