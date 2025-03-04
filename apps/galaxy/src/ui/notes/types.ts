import { type Row } from '@tanstack/react-table'
import { DateValue } from 'react-aria-components'
import { Metadata, QuickNoteSectionItem } from '@/types'
import { NoteDetailProps } from '../quicknotes/actual-note-view/types'
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
  cosignedDate: string
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
  noteTypeCode?: string
  noteTitleCode?: string
  notePositionCode: string
  cosignedByUserId?: number
  locationTimeZone?: string
  appointmentDateTime?: string
  patientName?: PatientName
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
  signedByUserId?: string
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

interface InboxSignNoteParams {
  patientId: string
  appointmentId: string
  noteId: string
  payload: {
    signDateTime: string
  }
}
interface GetNoteDocumentParams {
  patientId: string
  appointmentId: string
  documentId: string
}

type PatientNoteRow = Row<PatientNotes>

interface GetPatientNotesResponse {
  notes: PatientNotes[]
  total: number
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
  actualNoteDetailComponent: React.ComponentType<NoteDetailProps>
  id: QuickNoteSectionName
  providerTypes?: string[]
}

interface Addendum {
  id?: string
  noteId?: string
  signerDescription?: string
  signerId?: number
  signerCreateDate?: string
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
  addendum?: Addendum
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

interface NoteDocumentResponse {
  id: number
  resourceMetadata: Metadata
  documentId: string
  documentType: string
  fileName: string
  patientId: number
  appointmentId: number
  encounterDocumentSizeInBytes: number
  originalFileName: string
}
interface NoteDocumentsItemList {
  sectionName: string
  sectionItem: string
  sectionItemValue: string
}

interface GetPatientNotesParams {
  patientId?: string
  dateFrom?: string
  dateTo?: string
  authorIds?: number[]
  visitTypeIds?: number[]
  locationIds?: string[]
  locationServicesOffered?: string[]
  stateIds?: string[]
  practiceIds?: string[]
  organizationIds?: string[]
  status?: string[]
  patientName?: string
  page?: number
}

interface PatientName {
  firstName: string
  lastName: string
}
export enum Tabs {
  PENDING_COSIGNER_NOTES = 'SignedPending',
  PENDING_NOTES = 'pending',
}

export type {
  Addendum,
  CreateSignNoteParams,
  EncounterSignedNote,
  EncounterSignedNoteDetail,
  GetNoteDocumentParams,
  GetPatientNotesParams,
  GetPatientNotesResponse,
  GroupedBySectionName,
  NoteDetail,
  NoteDocument,
  NoteDocumentResponse,
  NoteDocuments,
  NoteDocumentsItemList,
  PatientNoteRow,
  PatientNotes,
  QuickNoteSectionItemPayload,
  WidgetType,
  InboxSignNoteParams,
}
