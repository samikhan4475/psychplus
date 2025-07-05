import { parseAbsoluteToLocal } from '@internationalized/date'
import { Row } from '@tanstack/react-table'
import { LucideIcon, UserCheck, UserPlus } from 'lucide-react'
import { Tag } from 'react-tag-autocomplete'
import {
  Channel,
  EmailRecipients,
  EmailRecipientTypes,
  SecureMessage,
  SecureMessageStatus,
  SendMode,
  Staff,
} from './types'

const bytesToMegaBytes = (bytes: number) => {
  const MB = bytes / (1024 * 1024)
  return MB.toFixed(2)
}
const getRecipientLabel = (
  channels: Array<{ sendMode?: string | EmailRecipientTypes }> = [],
): [string, LucideIcon?] => {
  const hasInternal = channels?.some(
    (channel) => channel.sendMode === EmailRecipientTypes.INTERNAL,
  )

  const hasExternal = channels?.some(
    (channel) => channel.sendMode === EmailRecipientTypes.EXTERNAL,
  )

  if (hasInternal && hasExternal) {
    return [Staff.INTERNAL_EXTERNAL, UserCheck]
  } else if (hasInternal) {
    return [Staff.INTERNAL, UserCheck]
  } else if (hasExternal) {
    return [Staff.EXTERNAL, UserPlus]
  }

  return ['-']
}
const isEmailRecipient = (
  item: EmailRecipients | Tag,
): item is EmailRecipients => {
  return (item as EmailRecipients).id !== undefined
}
const mapEmailData = ({
  emails,
  messageId,
  sendMode,
}: {
  emails: Partial<EmailRecipients>[] | Tag[]
  messageId?: string
  sendMode?: string
}): Partial<Channel>[] => {
  return (
    emails
      ?.filter((item): item is EmailRecipients | Tag => item !== undefined)
      .map((item) => {
        const receiverUserId = isEmailRecipient(item as EmailRecipients)
          ? (item as EmailRecipients).id
          : null
        const externalEmail = isEmailRecipient(item as EmailRecipients)
          ? (item as EmailRecipients)?.contactInfo?.email || ''
          : String((item as Tag).value || '')

        return {
          messageId,
          recordStatus: 'Active',
          receiverType: 'MAIN',
          receiverStatus: 'Dispatch',
          sendMode,
          receiverUserId,
          externalEmail: sendMode === SendMode.EXTERNAL ? externalEmail : null,
          readTimeStamp: new Date().toISOString(),
          isRead: false,
          isReplied: false,
          receiverStatusDetail: null,
          externalMessageId: null,
        }
      }) || []
  )
}
function splitName(fullName: string) {
  const [firstName, ...lastName] = fullName.trim().split(' ')
  return {
    firstName: firstName,
    lastName: lastName.join(' '),
  }
}
const getFullName = (
  firstName?: string,
  lastName?: string,
  externalEmail?: string | null,
) => (firstName && lastName ? `${firstName} ${lastName}` : externalEmail ?? '-')
function isEmail(keyword: string) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(keyword)
}
function sanitizeFormData<T extends object>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) =>
        value !== undefined &&
        value !== null &&
        value !== '' &&
        value?.length !== 0,
    ),
  ) as T
}

const getStatusColor = (status: SecureMessageStatus) => {
  switch (status) {
    case SecureMessageStatus.READ:
    case SecureMessageStatus.REPLIED:
      return 'gray'
    case SecureMessageStatus.UNREAD:
      return 'blue'
    default:
      return 'gray'
  }
}

const getLastMessageOfConversation = (
  secureMessage: Partial<SecureMessage> | null,
) => {
  let message = secureMessage
  if (!secureMessage?.secureMessageConversations?.length) {
    return secureMessage || null
  }

  // To find the last message in conversation with messageStatus "Inbox"
  const conversations = secureMessage.secureMessageConversations
  if (conversations && conversations.length > 0) {
    const lastInbox = [...conversations]
      .reverse()
      .find((c) => c?.messageStatus === 'Inbox')
    if (lastInbox) {
      message = lastInbox
    }
  }

  return message
}

const getLatestMessageWithOwnChannel = (
  secureMessage: Partial<SecureMessage> | null,
  userId: number,
) => {
  const conversation = secureMessage?.secureMessageConversations
  if (!conversation?.length) return { channel: undefined, message: undefined }

  for (let i = conversation.length - 1; i >= 0; i--) {
    const message = conversation[i]
    const channel = message.channels.find(
      (channel) => channel.receiverUserId === userId,
    )
    if (channel?.id) {
      return { channel, message }
    }
  }
  return { channel: undefined, message: undefined }
}

const hasUnreadInConversation = (
  secureMessage: SecureMessage,
  userId: number,
) => {
  if (!secureMessage?.secureMessageConversations?.length) return false
  return secureMessage?.secureMessageConversations
    ?.slice()
    .reverse()
    .some((message) =>
      message.channels.some(
        (channel) => channel.receiverUserId === userId && !channel.isRead,
      ),
    )
}

const sortOnLastMessage = (
  a: Row<Partial<SecureMessage>>,
  b: Row<Partial<SecureMessage>>,
): number => {
  if (!a.original?.lastMessageDate || !b.original?.lastMessageDate) return 0
  const timeA = parseAbsoluteToLocal(a.original?.lastMessageDate ?? '')
  const timeB = parseAbsoluteToLocal(b.original?.lastMessageDate ?? '')
  return timeA.compare(timeB)
}

export {
  bytesToMegaBytes,
  getFullName,
  getLastMessageOfConversation,
  getLatestMessageWithOwnChannel,
  getRecipientLabel,
  getStatusColor,
  hasUnreadInConversation,
  isEmail,
  mapEmailData,
  sanitizeFormData,
  sortOnLastMessage,
  splitName,
}
