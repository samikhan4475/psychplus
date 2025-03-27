import { CPTPrimaryCode, Metadata } from '@/types'

interface VisitTypes {
  defaultDuration?: string
  defaultCPTCode?: string
  cptPrimaryCodes?: CPTPrimaryCode[]
  visitSequence: string
  visitMedium: string
  visitTypeCode?: string
  visitNoteTitle: string
  visitDurationsInMinutes?: number[]
}

interface PreferenceSettings {
  id: string
  metadata: Metadata
  settingStatusCode: string
  levelCode: string
  categoryCode: string
  categoryValue: string
  name: string
  content: string
}

export type { PreferenceSettings, VisitTypes }
