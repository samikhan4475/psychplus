import { Metadata } from '@psychplus-v2/types'
import { NoteSectionName } from '../constants'

interface NoteSectionItem {
  id?: string
  pid: number
  appId?: number
  sectionName: string
  sectionItem: string
  sectionItemValue: string
  visitTypeDescription?: string
  visitTypeCode?: string
  visitSequence?: string
  appointmentType?: string
  metadata?: Metadata
}

type NoteAccordion = {
  id: NoteSectionName
  content: React.ReactNode
}

interface Option {
  value: string
  label: string
}

interface NoteData {
  id: string
  question: string
  value: number | string
  options: Option[]
  headingLabels?: string[]
}

export type { NoteSectionItem, NoteAccordion, NoteData, Option }
