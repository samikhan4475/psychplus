'use client'

import { CounterClockwiseClockIcon } from '@radix-ui/react-icons'
import { Flex, Heading, Popover } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { PropsWithRow } from '@/components'
import { FacilityAdmissionTable } from '../facility-admission-table'
import { SchedulingHistory } from '../types'

const FacilityAdmissionCell = ({ row }: PropsWithRow<SchedulingHistory>) => {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Flex justify="center" p="1">
          <CounterClockwiseClockIcon className="text-black cursor-pointer" />
        </Flex>
      </Popover.Trigger>
      <Popover.Content className="min-w-[650px] rounded-[10px] p-2 shadow-2">
        <Flex className="w-full gap-1.5" direction="column">
          <Flex justify="between" align="center" gap="2">
            <Heading size="4">Facility Admission 165278 Hx</Heading>
            <Popover.Close>
              <X
                size={24}
                strokeWidth={2}
                className="text-black cursor-pointer"
              />
            </Popover.Close>
          </Flex>
          <FacilityAdmissionTable />
        </Flex>
      </Popover.Content>
    </Popover.Root>
  )
}

export { FacilityAdmissionCell }
