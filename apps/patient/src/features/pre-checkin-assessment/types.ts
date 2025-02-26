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

export { type PreCheckinAssessmentTab, type SharedCode }
