import { ClearingHouseReceiver } from '@/types'

enum ClearingHouseTab {
  Receiver = 'Receiver',
  Submitter = 'Submitter',
  EDI = 'Ins. Plan EDI',
}

enum RecordStatuses {
  ACTIVE = 'Active',
}

interface GetReceiverListResponse {
  receivers: ClearingHouseReceiver[]
  total: number
}

interface EdiItem {
  id: string
  receiverName?: string
  receiverId?: string
  insurancePayerName?: string
  insurancePlanId?: string
  payerId?: string
  isEligibility?: boolean
  isElectronic?: boolean
  isInstitutional?: boolean
  isDental?: boolean
  isPaperCms1500?: boolean
  isPaperUb04?: boolean
}

interface GetEdiListResponse {
  ediList: EdiItem[]
  total: number
}
interface ClearingHouseSubmitter {
  name?: string
  username?: string
  email?: string
  password?: string
  submitterId?: string
  contactPerson?: string
  phone?: string
  fax?: string
  addressLine1?: string
  addressLine2?: string
  city?: string
  state?: string
  zip?: string
  id?: string
  practiceId?: string
  receiverId?: string
}

interface GetSubmitterListResponse {
  submitters: ClearingHouseSubmitter[]
  total: number
}

export {
  ClearingHouseTab,
  RecordStatuses,
  type ClearingHouseSubmitter,
  type GetSubmitterListResponse,
  type GetReceiverListResponse,
  type EdiItem,
  type GetEdiListResponse,
}
