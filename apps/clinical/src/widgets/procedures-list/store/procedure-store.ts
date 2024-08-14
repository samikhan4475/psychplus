import { StateCreator } from 'zustand'
import { ProcedureState } from './types'

const procedureStore: StateCreator<ProcedureState> = (set) => ({
  procedures: [],
  patientId: 0,
  noteId: 0,
  setPatientId: (patientId) => set({ patientId }),
  setNoteId: (noteId) => set({ noteId }),
  setProcedures: (procedures) => {
    set({ procedures })
  },
})

export { procedureStore }
