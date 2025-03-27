'use client'

import { Button, Flex, Popover } from '@radix-ui/themes'
import { HistoryIcon } from 'lucide-react'
import { PropsWithRow } from '@/components'
import { MedicationRefill } from '../types'

const CollapseCell = ({
  row: { toggleSelected, getIsSelected, original },
}: PropsWithRow<MedicationRefill>) => {
  return (
    <Flex
      justify="center"
      align="center"
      width="100%"
      height="100%"
      onClick={(e) => e.stopPropagation()}
    >
      <Popover.Root onOpenChange={toggleSelected} modal>
        <Popover.Trigger>
          <Button
            className="text-black !outline-none"
            type="button"
            variant="ghost"
            color="gray"
            size="1"
          >
            <HistoryIcon size="14" />
          </Button>
        </Popover.Trigger>
        <Popover.Content
          className="-mb-2 -mt-2 w-screen max-w-[calc(100vw_-_189px)] rounded-1 !p-0"
          align="start"
          alignOffset={3}
        >
          {/* HX Content will be here */}
          History
        </Popover.Content>
      </Popover.Root>
    </Flex>
  )
}

export { CollapseCell }
