import { Metadata } from '@/types'

interface VisitsList {
  metadata: Metadata
  dateTime: string
  patientName: string
  gender: string
  dob: string
  patientId: string
  visitId: string
  locationName: string
  visitType: string
  visitStatus: string
}

interface GetVisitListData {
  visitsListData: VisitsList[]
  total: number
}
interface VisitListPayload {
  providerIds: number[]
  status?: string
  startingDate?: string
  endingDate?: string
  name?: string
  dateOfBirth?: string
  gender?: string
  searchByMRN?: string
  visitId?: string
  visitType?: string
  visitStatus?: string
}

export type { VisitsList, VisitListPayload, GetVisitListData }
