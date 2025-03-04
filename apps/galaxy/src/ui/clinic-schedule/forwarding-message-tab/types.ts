import { LegalName, Metadata } from '@/types'

interface MessageForwardingRecipient {
  id?: string
  recipientUserId: number
  messageForwardingId?: string
  recordStatus?: string
  metadata?: Metadata
}

interface ForwardingMessage {
  id: string
  userId: number
  startDateTime: string
  endDateTime: string
  duration: number
  recordStatus: string
  metadata?: Metadata
  messageForwardingRecipients: MessageForwardingRecipient[]
  staffUserName: LegalName
  staffSpecialization: string
}

interface ForwardingMessageFilters {
  fromDate?: string
  toDate?: string
  forwardingIds?: string[]
  recordStatuses?: string[]
  userIds?: number[]
}
interface GetForwardingMessageListPayload {
  page?: number
  payload?: Partial<ForwardingMessageFilters>
}

enum RecordStatus {
  Active = 'Active',
  InActive = 'InActive',
}

export {
  RecordStatus,
  type ForwardingMessage,
  type GetForwardingMessageListPayload,
  type ForwardingMessageFilters,
  type MessageForwardingRecipient,
}
