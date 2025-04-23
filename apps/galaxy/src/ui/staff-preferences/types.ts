import { CPTPrimaryCode, Metadata } from '@/types'

enum PreferenceTab {
  Dashboard = 'Dashboard',
  PublicView = 'Public View',
  Alerts = 'Alerts',
  CoSignerInfo = 'CoSigner Info',
  VisitSetting = 'Visit Setting',
}

enum ApprovalType {
  all = 'all',
  public = 'public',
  alert = 'alert',
  cosigner = 'cosigner',
  visit = 'visit',
}

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

export { ApprovalType, PreferenceTab }
export type { PreferenceSettings, VisitTypes }
