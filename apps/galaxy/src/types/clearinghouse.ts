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
  address2?: string
  city: string
  state: string
  zip: string
  recordStatus: string
  isSupportMultipleDirectory: boolean
  practiceId?: string
}

export type { ClearingHouseReceiver }
