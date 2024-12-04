import { type Row } from '@tanstack/react-table'
import { DateValue } from 'react-aria-components'
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

export type PayloadType = {
  date: DateValue
  time: string
  visitType: string
  visitTitle: string
  description: string
  cosigner: string
  provider: string
}

interface EncounterSignedNoteDetail {
  sectionName: string
  sectionItem: string
  sectionItemValue: string
}

interface NoteObject {
  patientId: string
  appointmentId: string | null
  signedByUserId: string
  noteType: string
  noteTitle?: string
  coSignedByUserId?: string
  signedDate?: string
  encounterSignedNoteDetails: EncounterSignedNoteDetail[]
}

export interface CreateSignNoteParams {
  patientId: string
  appointmentId: string | null
  payload: NoteObject
}

type PatientNoteRow = Row<PatientNotes>

interface GetPatientNotesResponse {
  notes: PatientNotes[]
}

export type { PatientNotes, PatientNoteRow, GetPatientNotesResponse }
