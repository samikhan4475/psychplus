import React from 'react'
import { Row } from '@tanstack/react-table'
import { TextCell } from '@/components'
import { SecureMessage } from '../../types'

const MessageUserNameCell = ({ row }: { row: Row<SecureMessage> }) => (
  <TextCell className="text-[12px] font-[400]">
    {row?.original?.metadata?.createdByFullName}
  </TextCell>
)

export { MessageUserNameCell }
