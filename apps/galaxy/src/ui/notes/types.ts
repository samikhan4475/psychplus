import { type Row } from '@tanstack/react-table'
import { DateValue } from 'react-aria-components'
import {
  Appointment,
  Metadata,
  PatientProfile,
  QuickNoteSectionItem,
} from '@/types'
import { Allergy } from '../quicknotes/actual-note-view/types'
import { QuickNoteSectionName } from '../quicknotes/constants'

type GroupedBySectionName = Record<string, QuickNoteSectionItem[]>
interface PatientNotes {
  id: string
  patientId: string
  appointmentId: string
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
  visitTypeCode: string
  notePositionCode: string
}

type PayloadType = {
  date: DateValue
  time: string
  visitType: string
  visitTitle: string
  description: string
  cosigner: string
  provider: string
}

interface NoteObject {
  patientId: string
  appointmentId: string | null
  signedByUserId: string
  noteTypeCode: string
  noteTitleCode?: string
  coSignedByUserId?: string
  signedDate?: string
  encounterSignedNoteDetails: QuickNoteSectionItemPayload[]
}

interface QuickNoteSectionItemPayload {
  id?: string
  pid?: number
  appId?: number
  sectionName: string
  sectionItem: string
  sectionItemValue: string
  encounterType?: string
  isWithOutAppointmentId?: boolean
}

interface CreateSignNoteParams {
  patientId: string
  appointmentId: string | null
  payload: NoteObject
}
interface GetNoteDocumentParams {
  patientId: string
  appointmentId: string
  documentId: string
}

type PatientNoteRow = Row<PatientNotes>

interface GetPatientNotesResponse {
  notes: PatientNotes[]
}

interface EncounterSignedNoteDetail {
  id: string
  encounterNoteId: string
  sectionName: string
  sectionItem: string
  sectionItemValue: string
  metadata: Metadata
}

type WidgetType = {
  actualNoteDetailComponent: React.ComponentType<{
    allergies?: Allergy[]
    data: QuickNoteSectionItem[]
    appointments?: Appointment[]
    appointment?: Appointment
    patientId: string
    appointmentId: string
    patient?: PatientProfile
    groupedData?: GroupedBySectionName
    visitSequence: string
    visitType: string
  }>
  id: QuickNoteSectionName
  providerTypes?: string[]
}

interface EncounterSignedNote {
  metadata: Metadata
  id: string
  patientId: number
  appointmentId: number
  signedByUserId: number
  isError: boolean
  coSignedByUserId: number
  signedDate?: string
  noteTitleCode?: string
  noteTypeCode?: string
  encounterSignedNoteDetails: QuickNoteSectionItem[]
}

type NoteDetail = EncounterSignedNote[]

interface NoteDocument {
  id: string
  resourceMetadata: Metadata
  documentId: string
  documentType: string
  fileName: string
  patientId: string
  appointmentId: string
}

type NoteDocuments = NoteDocument[]

export type {
  PatientNotes,
  PatientNoteRow,
  GetPatientNotesResponse,
  NoteDetail,
  GroupedBySectionName,
  WidgetType,
  EncounterSignedNoteDetail,
  CreateSignNoteParams,
  QuickNoteSectionItemPayload,
  PayloadType,
  NoteDocuments,
  EncounterSignedNote,
  GetNoteDocumentParams,
  NoteDocument,
}
