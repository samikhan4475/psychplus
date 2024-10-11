interface QuickNoteSectionItem {
  id?: string
  pid: number
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
  createdByType?: string
  addToNote: boolean
  totalScore?: string
  encounterType?: string
  data: QuickNoteSectionItem[]
}

export type { QuickNoteSectionItem, QuickNoteHistory }
