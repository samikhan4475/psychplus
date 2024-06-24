interface HealthConcernDialogState {
  patientId: number
  setPatientId: (patientId: number) => void
  noteId: number
  setNoteId: (noteId: number) => void
}

type HealthConcernsDialogStoreType = HealthConcernDialogState

export type { HealthConcernDialogState, HealthConcernsDialogStoreType }
