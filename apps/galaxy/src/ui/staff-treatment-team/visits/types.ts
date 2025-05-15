import { Appointment } from '@/types'

interface GetVisitListData {
  visitsListData: Appointment[]
  total: number
}
interface VisitListPayload {
  startingDate?: string
  endingDate?: string
  name?: string
  dateOfBirth?: string
  patientIds?: number[]
  appointmentStatuses?: string[]
  locationIds?: string[]
  providerIds: number[]
  appointmentIds?: number[]
  gender?: string
  visitTypes?: string[]
  isShowActiveVisits?: boolean
}

export type { GetVisitListData, VisitListPayload }
