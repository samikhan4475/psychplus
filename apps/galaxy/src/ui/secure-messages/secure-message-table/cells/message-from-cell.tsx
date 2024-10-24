import React from 'react'
import { Badge } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { TextCell } from '@/components'
import { UserSharedLineIcon } from '@/components/icons'
import { cn } from '@/utils'
import { SecureMessage } from '../../types'
import { getRecipientLabel } from '../../utils'

const MessageFromCell = ({ row }: { row: Row<SecureMessage> }) => {
  const { channels } = row.original || []

  return (
    <Badge color={'gray'}>
      <TextCell
        className={cn(
          'flex items-center gap-1 font-bold',
          'text-gray',
          'text-[11px]',
        )}
      >
        <UserSharedLineIcon />
        {getRecipientLabel(channels)}
      </TextCell>
    </Badge>
  )
}

export { MessageFromCell }
