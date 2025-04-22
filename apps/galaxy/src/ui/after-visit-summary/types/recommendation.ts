import { DateValue } from 'react-aria-components'

interface ProviderRecommendationsHistoryFilters {
  historyCreatedFrom?: DateValue | string
  historyCreatedTo?: DateValue | string
  createdById?: number
}
interface Filters {
  historyCreatedFrom?: string | null
  historyCreatedTo?: string | null
  createdById?: string
}

interface ProviderRecommendationsSave {
  appointmentId: string
  recommendation: string
}

interface Recommendation {
  id: string
  appointmentId: number
  recommendation: string
  recordStatus: string
  metadata: {
    createdOn: string
    createdBy: number
    createdByFullName: string
    updatedOn: string
    updatedBy: number
    updatedByFullName: string
    deletedOn: string
    deletedBy: number
    deletedByFullName: string
  }
}

export type {
  ProviderRecommendationsHistoryFilters,
  ProviderRecommendationsSave,
  Recommendation,
  Filters,
}
