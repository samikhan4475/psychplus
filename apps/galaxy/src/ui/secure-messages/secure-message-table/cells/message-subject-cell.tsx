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
  return (
    <Flex justify="between" width="100%" className="relative">
      <TextCell>{row.original.subject}</TextCell>
      <Flex
        gap="2"
        justify="end"
        pr="2"
        className="bg-white invisible absolute right-0 top-0 px-2 group-hover/row-hover:visible"
      >
        <Tooltip content="Archieve">
          <ArchieveIcon />
        </Tooltip>
        <Tooltip content="Mark as Read">
          <MailIcon />
        </Tooltip>
      </Flex>
    </Flex>
  )
}
export { MessageSubjectCell }
