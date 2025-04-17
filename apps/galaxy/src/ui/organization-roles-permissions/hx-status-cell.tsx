'use client'

import React, { useState } from 'react'
import { CounterClockwiseClockIcon } from '@radix-ui/react-icons'
import { Flex, Heading, Popover } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { CodesetSelectCell, PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { Role } from '@/types'
import { updateRoleAction } from './actions'
import { HxListTable } from './hx-list-table'

const HxStatusCell = ({ row }: PropsWithRow<Role>) => {
  const [currentStatus, setCurrentStatus] = useState(row.original.recordStatus)

  const onChangeStatus = async (value: string) => {
    setCurrentStatus(value)

    const response = await updateRoleAction(
      { ...row.original, recordStatus: value },
      row.original.id,
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

          <Popover.Content className="min-w-[1200px] rounded-[10px] p-2 shadow-2">
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
              <HxListTable organizationId={row.original.id} />
            </Flex>
          </Popover.Content>
        </Flex>
      </Popover.Root>
      <CodesetSelectCell
        codeset={CODESETS.RecordStatus}
        className="w-[100px] text-gray-10"
        onValueChange={onChangeStatus}
        value={currentStatus}
        exclude={['Deleted', 'Archived']}
      />
    </Flex>
  )
}

export { HxStatusCell }
