import { LegalName } from './name'

interface StaffComment {
  id: number
  date_time: string
  staff: string
  organization?: string
  comment: string
  isDeleted?: boolean
  isBillingComment?: boolean
  isTreatmentComment?: boolean
  isUrgentComment?: boolean
  appointmentId?: number
  patientId?: number
  recordStatus?: string
  staffName?: LegalName
  commentedOn?: string
}

interface StaffCommentParams {
  startDate?: string
  endDate?: string
  partialComment?: string
  isBilling?: boolean
  isTreatment?: boolean
  patientId?: string
  appointmentId?: number
  staff?: string
  recordStatuses?: string[] | null
}
interface GetCommentsData {
  comments: StaffComment[]
}

export type { StaffComment, StaffCommentParams, GetCommentsData }
