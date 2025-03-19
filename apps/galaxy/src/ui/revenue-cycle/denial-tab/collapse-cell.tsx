'use client'

import { Button, Flex, Popover } from '@radix-ui/themes'
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react'
import { PropsWithRow } from '@/components'
import { ResponseHistoryRecord } from '../types'

const CollapseCell = ({
  row: { toggleSelected, getIsSelected, original },
}: PropsWithRow<ResponseHistoryRecord>) => {
  return (
    <Flex justify="start">
      <Popover.Root onOpenChange={toggleSelected} modal>
        <Popover.Trigger>
          <Button
            className="text-black !outline-none"
            type="button"
            variant="ghost"
            color="gray"
            size="1"
          >
            {getIsSelected() ? (
              <ChevronDownIcon size={16} />
            ) : (
              <ChevronRightIcon size={16} />
            )}
          </Button>
        </Popover.Trigger>
        <Popover.Content
          className="min-h-28 min-w-[300px] -mb-2 -mt-2 flex items-center rounded-1 !p-0"
          align="start"
        >
          {/* Will implement HX here */}
        </Popover.Content>
      </Popover.Root>
    </Flex>
  )
}

export { CollapseCell }
