'use client'

import { CounterClockwiseClockIcon } from '@radix-ui/react-icons'
import { Flex, Heading, Popover } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { PropsWithRow, SelectCell } from '@/components'
import { SelectOptionType } from '@/types'
import { HxListTable } from './hx-list-table'
import { PrimaryLocation } from './types'

interface Props extends PropsWithRow<PrimaryLocation> {
  options: SelectOptionType[]
  onLocationChange: (stateCode: string, locationId: string) => void
}

const LocationCell = ({
  row: { original },
  options,
  onLocationChange,
}: Props) => {
  return (
    <Flex>
      <Popover.Root>
        <Flex align="center" gap="1" p="1" width="100%">
          <Popover.Trigger>
            <CounterClockwiseClockIcon className="text-black cursor-pointer" />
          </Popover.Trigger>

          <Popover.Content className="min-w-[680px] rounded-[10px] p-2 shadow-2">
            <Flex className="w-full gap-1.5" direction="column">
              <Flex justify="between" align="center" gap="2">
                <Heading size="4">Last Status History</Heading>
                <Popover.Close>
                  <X
                    size={24}
                    strokeWidth={2}
                    className="text-black cursor-pointer"
                  />
                </Popover.Close>
              </Flex>
              <HxListTable stateCode={original.stateCode} location={options} />
            </Flex>
          </Popover.Content>
        </Flex>
      </Popover.Root>
      <SelectCell
        className="w-full"
        options={options}
        value={original.locationId}
        onValueChange={(value) => onLocationChange(original.stateCode, value)}
      />
    </Flex>
  )
}

export { LocationCell }
