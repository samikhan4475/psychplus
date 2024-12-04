interface Metadata {
  createdOn: string
  createdBy: number
  createdByFullName: string
  updatedOn: string
  updatedBy: number
  updatedByFullName: string
  deletedOn: string
  deletedBy: number
  deletedByFullName: string
}

interface EncounterSignedNoteDetail {
  id: string
  encounterNoteId: string
  sectionName: string
  sectionItem: string
  sectionItemValue: string
  metadata: Metadata
}

export interface ApiResponse {
  metadata: Metadata
  id: string
  patientId: number
  appointmentId: number
  signedByUserId: number
  signedDate: string
  coSignedByUserId: number
  coSignedDate: string
  isError: boolean
  encounterSignedNoteDetails: EncounterSignedNoteDetail[]
}
