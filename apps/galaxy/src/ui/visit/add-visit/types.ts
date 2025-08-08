import { BookVisitResponse } from '../types'

interface SlotDetails {
  state: string
  location: string
  service: string
  providerType: string
  duration: string
  providerId: string
}
interface AppointmentData {
  appointments: BookVisitResponse[]
}

enum BillingProviderInfo {
  PROVIDER = 'Provider',
  COSIGNER = 'Cosigner',
  PRACTICE = 'Practice',
}

export { type SlotDetails, BillingProviderInfo, type AppointmentData }
