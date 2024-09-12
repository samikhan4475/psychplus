'use client'

import React from 'react'
import {
  DotsHorizontalIcon,
  DownloadIcon,
  InfoCircledIcon,
} from '@radix-ui/react-icons'
import { Flex, IconButton, Text } from '@radix-ui/themes'
import { type PropsWithRow } from '@psychplus/ui/data-table'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { useStore } from '../../store'
import { ClaimSubmissionHistory } from '../../types'

const RowActionDropdown = ({
  row: { original: record },
}: PropsWithRow<ClaimSubmissionHistory>) => {
  const { setClaimSubmissionHistoryModalOpen } = useStore((state) => ({
    setClaimSubmissionHistoryModalOpen:
      state.setClaimSubmissionHistoryModalOpen,
  }))
  const { setClaimSubmissionHistoryBatchId } = useStore((state) => ({
    setClaimSubmissionHistoryBatchId: state.setClaimSubmissionHistoryBatchId,
  }))

  const modalOpen = () => {
    setClaimSubmissionHistoryBatchId(record.id)
    setClaimSubmissionHistoryModalOpen(true)
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton size="1" variant="ghost" mr="1">
          <DotsHorizontalIcon height={16} width={16} />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item
          className="w-full py-4 hover:bg-[#151B4A]"
          onClick={modalOpen}
        >
          <Flex className=" hover:text-[white]" align="center" gap="1">
            <InfoCircledIcon />
            <Text size="3">Detail</Text>
          </Flex>
        </DropdownMenu.Item>

        <DropdownMenu.Item className="w-full py-4 hover:bg-[#151B4A]">
          <Flex className=" hover:text-[white]" align="center" gap="1">
            <DownloadIcon />
            <Text size="3">Download</Text>
          </Flex>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export { RowActionDropdown }
