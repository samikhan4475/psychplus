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

export type { SlotDetails, AppointmentData }
