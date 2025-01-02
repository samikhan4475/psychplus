'use client'

import React from 'react'
import { CounterClockwiseClockIcon } from '@radix-ui/react-icons'
import { Flex, Heading, Popover } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { PropsWithRow } from '@/components'
import { HistoryTable } from '../history-table'
import { SchedulingHistoryData } from '../types'

const HistoryCell = ({ row }: PropsWithRow<SchedulingHistoryData>) => {
  return (
    <Popover.Root>
      <Flex align="center" gap="1" p="1" width="100%">
        <Popover.Trigger>
          <CounterClockwiseClockIcon className="text-black cursor-pointer" />
        </Popover.Trigger>
        <Popover.Content className="min-w-[608px] rounded-[10px] p-2 shadow-2">
          <Flex className="w-full gap-1.5" direction="column">
            <Flex justify="between" align="center" gap="2">
              <Heading size="4">History</Heading>
              <Popover.Close>
                <X
                  size={24}
                  strokeWidth={2}
                  className="text-black cursor-pointer"
                />
              </Popover.Close>
            </Flex>
            <HistoryTable appointmentId={row.original.appointmentId} />
          </Flex>
        </Popover.Content>
      </Flex>
    </Popover.Root>
  )
}

export { HistoryCell }
