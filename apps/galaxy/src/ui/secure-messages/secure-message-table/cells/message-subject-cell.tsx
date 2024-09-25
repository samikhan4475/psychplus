import React from 'react'
import { Box, Flex, Tooltip } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { TextCell } from '@/components'
import { ArchiveIcon, MailIcon } from '@/components/icons'
import { SecureMessage } from '../../types'

const MessageSubjectCell = ({ row }: { row: Row<SecureMessage> }) => {
  return (
    <Flex justify="between" width="100%" className="relative  p-0">
      <TextCell className="line-clamp-1 overflow-hidden text-ellipsis text-[12px] font-[400]">
        {row.original.subject}
      </TextCell>
      <Flex
        gap="2"
        justify="end"
        pr="2"
        className="bg-pp-bg-table-cell invisible absolute -top-0 right-0 p-0 px-2 group-hover/row-hover:visible"
      >
        <Tooltip content="Archive">
          <Box className="hover:bg-pp-table-subRows rounded-2 p-[2px]">
            <ArchiveIcon fill="#60646C" />
          </Box>
        </Tooltip>
        <Tooltip content="Mark as Read">
          <Box className="hover:bg-pp-table-subRows rounded-2 p-[2px]">
            <MailIcon fill="#60646C" />
          </Box>
        </Tooltip>
      </Flex>
    </Flex>
  )
}
export { MessageSubjectCell }
