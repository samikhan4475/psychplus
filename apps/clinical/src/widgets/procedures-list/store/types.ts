import { Procedure } from '@psychplus/procedures'

interface ProcedureState {
  procedures: Procedure[]
  noteId: number
  patientId: number
  setProcedures: (problems: Procedure[]) => void
  setPatientId: (patientId: number) => void
  setNoteId: (noteId: number) => void
}

type ProcedureStoreType = ProcedureState

export type { ProcedureState, ProcedureStoreType }
