import React from 'react'
import { Row } from '@tanstack/react-table'
import { TextCell } from '@/components'
import { SecureMessage } from '../../types'

const MessageUserNameCell = ({ row }: { row: Row<SecureMessage> }) => (
  <TextCell>{row?.original?.metadata?.createdByFullName}</TextCell>
)

export { MessageUserNameCell }
