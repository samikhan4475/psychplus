enum ClearingHouseTab {
  Receiver = 'Receiver',
  Submitter = 'Submitter',
}

enum RecordStatuses {
  ACTIVE = 'Active',
}

interface ClearingHouseReceiver {
  id: string
  clearingHouseName: string
  receiverId: string
  receiverName: string
  phone: string
  fax: string
  email: string
  website: string
  submissionMethod: string
  submissionUrl: string
  submissionPort: string
  submissionDirectory: string
  batchResponseDirectory: string
  chResponseDirectory: string
  claimResponseDirectory: string
  eraResponseDirectory: string
  isa01: string
  isa03: string
  isa05: string
  isa07: string
  isa08: string
  gs03: string
  nm140ReceiverName: string
  nm140ReceiverId: string
  address1: string
  address2: string
  city: string
  state: string
  zip: string
  recordStatus: string
  isSupportMultipleDirectory: boolean
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
  type ClearingHouseReceiver,
}
