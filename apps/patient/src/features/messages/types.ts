import { ReactNode } from 'react'
import { LegalName, Metadata } from '@psychplus-v2/types'

interface Messages {
  id: number | string
  name: string
  message: string
  date: string
  isMine: boolean
  attachments: Attachment[]
}

interface ChatHeadTypes {
  id: number | string
  name: string
  role: string
  message: string
  time: string
  isUnread: boolean
  icon?: ReactNode
  avatar?: string
  isOnline?: boolean
  isTeam: boolean
  groupId?: string
  conversationId?: string
}

interface UserGroup {
  id: string
  metadata: Metadata
  recordStatus: string
  shortName: string
  displayName: string
  userGroupType: string
}

interface Channel {
  id: string
  metadata: Metadata
  recordStatus: string
  receiverUserId: number
  receiverEmail: string
  receiverName: LegalName
  receiverUserRole: string
  messageId: string
  receiverType: string
  receiverStatus: string
  sendMode: string
  receiverStatusDetail: string
  externalMessageId: string
  externalEmail: string
  readTimeStamp: string
  isRead: boolean
  isReplied: boolean
}

interface Attachment {
  id: string
  metadata: Metadata
  recordStatus: string
  messageId: string
  name: string
  uri: string
  mimeType: string
  fileDescription: string
}

interface ChatResponseTypes {
  id: string | number
  metadata: Metadata
  recordStatus: string
  senderUserId: number
  senderEmail: string
  senderName: LegalName
  senderUserRole: string
  conversationId: string
  externalEmailAddress: string
  subject: string
  text: string
  messageStatus: string
  messageType: string
  lastMessageDate: string
  sentOn: string
  isMessageSent: boolean
  channels: Channel[]
  attachments: Attachment[]
  secureMessageConversations: string[]
  isEmrDirectUser: boolean
  groupId: string
  isForTreatmentTeam: boolean
  isResolved: boolean
}

export type { Messages, ChatHeadTypes, UserGroup, ChatResponseTypes }
