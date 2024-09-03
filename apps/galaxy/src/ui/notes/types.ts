import { type Row } from '@tanstack/react-table'

interface PatientNotes {
  date: string
  time: string
  authors: string
  visitType: string
  visitTitle: string
  location: string
  service: string
  state: string
  practice: string
  organization: string
  status: string
}

type PatientNoteRow = Row<PatientNotes>

interface GetPatientNotesResponse {
  notes: PatientNotes[]
}

export type { PatientNotes, PatientNoteRow, GetPatientNotesResponse }
