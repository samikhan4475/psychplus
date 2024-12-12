'use client'

import React from 'react'
import { CounterClockwiseClockIcon } from '@radix-ui/react-icons'
import { Flex, Heading, Popover } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { PropsWithRow, SelectCell } from '@/components'
import { Organization } from '../types'
import { HxListTable } from './hx-list-table'

// TODO: will change it when doing API integration
const STATUS_CODESET = [
  {
    label: 'Active',
    value: 'Active',
  },
  {
    label: 'Inactive',
    value: 'Inactive',
  },
  {
    label: 'Error',
    value: 'Error',
  },
]

const HxStatusCell = ({ row }: PropsWithRow<Organization>) => {
  return (
    <Flex>
      <Popover.Root>
        <Flex align="center" gap="1" p="1" width="100%">
          <Popover.Trigger>
            <CounterClockwiseClockIcon className="text-black cursor-pointer" />
          </Popover.Trigger>

          <Popover.Content className="min-w-[373px] rounded-[10px] p-2 shadow-2">
            <Flex className="w-full gap-1.5" direction="column">
              <Flex justify="between" align="center" gap="2">
                <Heading size="4">Status Hx</Heading>
                <Popover.Close>
                  <X
                    size={24}
                    strokeWidth={2}
                    className="text-black cursor-pointer"
                  />
                </Popover.Close>
              </Flex>
              <HxListTable organizationId={row.original.id} />
            </Flex>
          </Popover.Content>
        </Flex>
      </Popover.Root>
      <SelectCell
        options={STATUS_CODESET}
        className="w-[100px] bg-gray-3 text-gray-10"
      />
    </Flex>
  )
}

export { HxStatusCell }
