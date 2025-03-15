import { PreCheckinAssessmentTabs } from './constants'

type PreCheckinAssessmentTab = {
  id: PreCheckinAssessmentTabs
  content: React.ReactNode
}

type SharedCode = {
  value: string
  display: string
  attributes?:  {
    name: string
    value: string
  }[]
  groupingCode?: string
}

interface PreCheckInStatus {
  preCheckInCompletedTabs: PreCheckinAssessmentTabs[]
  isPreCheckInCompleted: boolean
  activeTab: PreCheckinAssessmentTabs
  id: string
}

export type { PreCheckinAssessmentTab, SharedCode, PreCheckInStatus }
