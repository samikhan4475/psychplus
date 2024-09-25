import { LegalName } from './name'

interface StaffComment {
  id: number
  date_time: string
  staff: string
  organization?: string
  staffCommment: string
  isDeleted?: boolean
  isBillingComment?: boolean
  isTreatmentComment?: boolean
  isUrgentComment?: boolean
  patientId?: number
  recordStatus?: string
  staffName?: LegalName
  commentedOn?: string
}

interface StaffCommentParams {
  StartDate?: string
  EndDate?: string
  PartialComment?: string
  IsBilling: boolean
  IsTreatment: boolean
  PatientId: string
  staff?: string
  RecordStatuses?: string | null
}
interface GetCommentsData {
  comments: StaffComment[]
}

export type { StaffComment, StaffCommentParams, GetCommentsData }
