interface QuickNoteSectionItem {
  id?: string
  pid: number
  appId?: number
  sectionName: string
  sectionItem: string
  sectionItemValue: string
  encounterType?: string
}

interface QuickNoteHistory {
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
}

export type { QuickNoteSectionItem, QuickNoteHistory, QuickNoteDetailsPayload }
