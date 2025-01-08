'use client'

import React, { useMemo, useState } from 'react'
import { CounterClockwiseClockIcon } from '@radix-ui/react-icons'
import { Flex, Heading, Popover } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { PropsWithRow, SelectCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { updateOrganizationAction } from '../actions'
import { Organization } from '../types'
import { HxListTable } from './hx-list-table'

const HxStatusCell = ({ row }: PropsWithRow<Organization>) => {
  const [currentStatus, setCurrentStatus] = useState(row.original.recordStatus)
  const codes = useCodesetCodes(CODESETS.RecordStatus)

  const items = useMemo(
    () =>
      codes.map((code) => ({
        label: code.display,
        value: code.value,
      })),
    [],
  )

  const handleStatusChange = async (status: string) => {
    setCurrentStatus(status)
    const response = await updateOrganizationAction(
      {
        ...row.original,
        recordStatus: status,
      },
      row.original?.id,
    )

    if (response.state === 'error') {
      setCurrentStatus(row.original.recordStatus)
      toast.error(response.error)
      return
    }

    toast.success('Status updated successfully')
  }

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
        options={items}
        className="w-[100px] bg-gray-3 text-gray-10"
        onValueChange={handleStatusChange}
        value={currentStatus}
      />
    </Flex>
  )
}

export { HxStatusCell }
