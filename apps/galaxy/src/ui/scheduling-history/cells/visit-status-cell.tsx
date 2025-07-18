'use client'

import React from 'react'
import { CounterClockwiseClockIcon } from '@radix-ui/react-icons'
import { Flex, Heading, Popover } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { PropsWithRow, TextCell } from '@/components'
import { SchedulingHistoryData } from '../types'
import { VisitStatusTable } from '../visit-status-table'

const VisitStatusCell = ({ row }: PropsWithRow<SchedulingHistoryData>) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }
  return (
    <Popover.Root>
      <Flex align="center" gap="1" p="1" width="100%">
        <Popover.Trigger onClick={handleClick}>
          <CounterClockwiseClockIcon className="text-black cursor-pointer" />
        </Popover.Trigger>
        <TextCell>{row?.original?.visitStatus}</TextCell>
        <Popover.Content className="min-w-[373px] rounded-[10px] p-2 shadow-2">
          <Flex className="w-full gap-1.5" direction="column">
            <Flex justify="between" align="center" gap="2">
              <Heading size="4">Visit status Hx</Heading>
              <Popover.Close onClick={handleClick}>
                <X
                  size={24}
                  strokeWidth={2}
                  className="text-black cursor-pointer"
                />
              </Popover.Close>
            </Flex>
            <VisitStatusTable appointmentId={row.original.appointmentId} />
          </Flex>
        </Popover.Content>
      </Flex>
    </Popover.Root>
  )
}

export { VisitStatusCell }
