import { ClearingHouseReceiver } from '@/types'

enum ClearingHouseTab {
  Receiver = 'Receiver',
  Submitter = 'Submitter',
}

enum RecordStatuses {
  ACTIVE = 'Active',
}

interface GetReceiverListResponse {
  receivers: ClearingHouseReceiver[]
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
}
