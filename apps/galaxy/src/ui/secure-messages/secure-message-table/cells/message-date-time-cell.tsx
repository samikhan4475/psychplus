import React from 'react'
import { Text } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { TextCell } from '@/components'
import { getSlashedDateString, getTimeLabel } from '@/utils'
import { SecureMessage } from '../../types'

const MessageDateTimeCell = ({ row }: { row: Row<SecureMessage> }) => {
  const dateTime =
    row?.original?.metadata?.createdBy.toString() || new Date().toISOString()

  const date = getSlashedDateString(dateTime)
  const time = getTimeLabel(dateTime)

  return (
    <TextCell>
      {date} <Text className="text-pp-gray-1">{time}</Text>
    </TextCell>
  )
}

export { MessageDateTimeCell }
