import { Metadata } from './metadata'
import { LegalName } from './name'

interface WaitlistResponse {
  id: number
  metadata: Metadata
  visitTypeCode: string
  providerId: number
  waitingStatus: string
  priority: string
  fromDate: string
  fromTime: string
  toDate: string
  toTime: string
  recordStatus: string
  patientId: number
  patientName: LegalName
  providerName: LegalName
  isAlertSent: boolean
}

interface WaitlistPayload {
  isIncludeMetadataResourceChangeControl?: boolean
  isIncludeMetadataResourceIds?: boolean
  isIncludeMetadataResourceStatus?: boolean
  visitTypeCode?: string
  patientName?: string
  dateRangeStart?: string
  dateRangeEnd?: string
  timeRangeStart?: string
  timeRangeEnd?: string
  initiatedDateRangeStart?: string
  initiatedDateRangeEnd?: string
  initiatedFromDate?: string
  initiatedToDate?: string
  initiatedFromTime?: string
  initiatedToTime?: string
  waitlistStatus?: string[]
  providerId?: number
  isAlertSent?: string
  isIncludeStaff?: boolean
  isIncludePatient?: boolean
  patientIds?: number[]
}

interface CreateWaitlistPayload {
  id?: string | number
  metadata?: Metadata
  visitTypeCode: string
  providerId: number
  providerName?: string
  waitingStatus: string
  priority: string
  fromDate: string
  fromTime?: string
  toDate: string
  toTime?: string
  recordStatus?: string
  patientId: number
  patientName?: LegalName
  isAlertSent?: boolean
}
interface UpdateWaitlistpayload extends CreateWaitlistPayload {
  id: number | undefined
}

export {
  type WaitlistResponse,
  type WaitlistPayload,
  type CreateWaitlistPayload,
  type UpdateWaitlistpayload,
}
