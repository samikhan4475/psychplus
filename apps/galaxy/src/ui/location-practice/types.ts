import { Location, Metadata, Practice } from '@/types'

enum LocationPracticeTab {
  Institutional = 'Institutional',
  Professional = 'Professional',
}

interface LocationPractice {
  id: string
  metadata: Metadata
  recordStatus: string
  practiceId: string
  locationId: string
  practiceType: string
  isPrimaryPractice: boolean
  isOverRideExistingPrimary: boolean
  practice: Practice
  location: Location
}

export { type LocationPractice, LocationPracticeTab }
