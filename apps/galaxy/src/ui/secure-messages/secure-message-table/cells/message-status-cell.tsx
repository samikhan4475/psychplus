import React from 'react'
import { Badge } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { TextCell } from '@/components'
import { useStore as globalStore } from '@/store'
import { cn } from '@/utils'
import { getStatusColor } from '../../status-color'
import { SecureMessage, SecureMessageStatus } from '../../types'

const MessageStatusCell = ({ row }: { row: Row<SecureMessage> }) => {
  const user = globalStore((state) => state.user)
  let status = SecureMessageStatus.UNREAD

  const channel = row.original.channels?.find(
    (channel) => channel.receiverUserId === user.id,
  )
  const { isRead, isReplied } = channel || {}

  if (isRead && !isReplied) status = SecureMessageStatus.READ
  else if (isReplied) status = SecureMessageStatus.REPLIED

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
