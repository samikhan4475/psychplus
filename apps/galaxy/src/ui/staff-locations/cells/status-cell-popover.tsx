import React from 'react'
import { Button, Popover } from '@radix-ui/themes'
import { HistoryIcon } from 'lucide-react'
import { StaffLocationHistoryTable } from '../staff-location-history-table'
import { StatusCellHeading } from './status-cell-heading'

interface StatusCellPopoverProps {
  providerLocationId: string
}
const StatusCellPopover = ({ providerLocationId }: StatusCellPopoverProps) => {
  return (
    <Popover.Root modal>
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
        className=" w-screen  max-w-[350px] rounded-1 !p-0"
        align="start"
        alignOffset={3}
      >
        <StatusCellHeading />
        <StaffLocationHistoryTable providerLocationId={providerLocationId} />
      </Popover.Content>
    </Popover.Root>
  )
}

export { StatusCellPopover }
