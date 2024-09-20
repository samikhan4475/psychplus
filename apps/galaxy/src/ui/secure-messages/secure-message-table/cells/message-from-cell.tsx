import React from 'react'
import { Badge } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { TextCell } from '@/components'
import { UserSharedLineIcon } from '@/components/icons'
import { cn } from '@/utils'
import { SecureMessage } from '../../types'

const MessageFromCell = ({ row }: { row: Row<SecureMessage> }) => (
  <Badge color={'gray'}>
    <TextCell className={cn('flex items-center gap-1 font-bold', 'text-gray')}>
      <UserSharedLineIcon />
      {row?.original?.channels?.[0]?.sendMode}
    </TextCell>
  </Badge>
)

export { MessageFromCell }
