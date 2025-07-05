import { useMemo } from 'react'
import { Badge } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { TextCell } from '@/components'
import { useStore as globalStore } from '@/store'
import { cn } from '@/utils'
import { SecureMessage, SecureMessageStatus } from '../../types'
import { getStatusColor, hasUnreadInConversation } from '../../utils'

const MessageStatusCell = ({ row }: { row: Row<SecureMessage> }) => {
  const user = globalStore((state) => state.user)

  const { isRead, isReplied } = useMemo(() => {
    const conversation = row.original.secureMessageConversations || []
    const hasConversation = conversation?.length

    if (hasConversation) {
      let hasReplied = false
      for (let i = conversation.length - 1; i >= 0; i--) {
        const message = conversation[i]
        const channel = message.channels.find(
          (channel) => channel.receiverUserId === user.id,
        )
        if (channel?.isReplied) {
          hasReplied = true
          break
        }
      }
      return {
        isRead: !hasUnreadInConversation(row.original, user.id),
        isReplied: hasReplied,
      }
    }

    const channel = row.original.channels?.find(
      (channel) => channel.receiverUserId === user.id,
    )

    return {
      isRead: channel?.isRead || false,
      isReplied: channel?.isReplied || false,
    }
  }, [row.original.secureMessageConversations, user.id])

  let status
  if (!isRead) status = SecureMessageStatus.UNREAD
  else if (isReplied) status = SecureMessageStatus.REPLIED
  else status = SecureMessageStatus.READ

  return (
    <Badge color={getStatusColor(status)}>
      <TextCell
        className={cn(
          'font-bold',
          `text-${getStatusColor(status)}`,
          'text-[11px]',
        )}
      >
        {status || '-'}
      </TextCell>
    </Badge>
  )
}

export { MessageStatusCell }
