import React from 'react'
import { Flex, Tooltip } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { TextCell } from '@/components'
import { ArchieveIcon, MailIcon } from '@/components/icons'
import { CustomTable, SecureMessage } from '../../types'

const MessageSubjectCell = ({
  row,
  table,
}: {
  row: Row<SecureMessage>
  table: CustomTable<SecureMessage>
}) => {
  const rowId = table.options.meta?.rowHover
  const hovered = row.id === rowId
  return (
    <Flex justify="between" width="100%" className="relative">
      <TextCell>{row.original.subject}</TextCell>
      {hovered && (
        <Flex
          gap="2"
          justify="end"
          pr="2"
          className="bg-white absolute right-0 top-0  px-2"
        >
          <Tooltip content="Archieve">
            <ArchieveIcon />
          </Tooltip>
          <Tooltip content="Mark as Read">
            <MailIcon />
          </Tooltip>
        </Flex>
      )}
    </Flex>
  )
}
export { MessageSubjectCell }
