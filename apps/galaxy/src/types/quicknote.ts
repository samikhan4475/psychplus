import { Metadata } from './metadata'

interface QuickNoteSectionItem {
  id?: string
  pid: number
  appId?: number
  sectionName: string
  sectionItem: string
  sectionItemValue: string
  encounterType?: string
  isWithOutAppointmentId?: boolean
  metadata?: Metadata
}

interface QuickNoteHistory {
  visitType: string
  visitId: string
  patientId: number
  sectionName: string
  createdOn: string
  createdBy: number
  createdByFullName: string
  createdByRole?: string
  addToNote: boolean
  totalScore?: string
  note?: string
  data: QuickNoteSectionItem[]
}

interface QuickNoteDetailsPayload {
  patientId: number
  sectionName: string[]
  appointmentId?: number
  isLatest: boolean
  isWithAppointmentNull?: boolean
  historyCreatedByUserId?: number
  isCopyMyPrevious?: boolean
  sectionItem?:string
}

export type { QuickNoteSectionItem, QuickNoteHistory, QuickNoteDetailsPayload }
