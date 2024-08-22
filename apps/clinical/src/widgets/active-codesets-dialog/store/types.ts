interface ActiveCodeSetDialogState {
  patientId: number
  setPatientId: (patientId: number) => void
  noteId: number
  setNoteId: (noteId: number) => void
}

type ActiveCodeSetsDialogStoreType = ActiveCodeSetDialogState

export type { ActiveCodeSetDialogState, ActiveCodeSetsDialogStoreType }
