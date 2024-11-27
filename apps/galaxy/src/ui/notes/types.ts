import { type Row } from '@tanstack/react-table'
import { Metadata } from '@/types'

interface PatientNotes {
  id: string
  patientId: number
  appointmentId: number
  metadata?: Metadata
  createdOn: string
  signedBy: string
  signedDate: string
  cosignedByUserName: string
  coSignedDate: string
  visitType: string
  visitSequence: string
  visitMedium: string
  visitTitle: string
  locationName: string
  practiceName: string
  organizationName: string
  noteStatus: string
  locationId: string
  stateCode: string
  practiceId: string
  organizationId: string
  signedByUserId: number
  signedByUserName: number
  serviceOffered: string
}

type PatientNoteRow = Row<PatientNotes>

interface GetPatientNotesResponse {
  notes: PatientNotes[]
}

export type { PatientNotes, PatientNoteRow, GetPatientNotesResponse }
