'use client'

import { IconButton, Popover } from '@radix-ui/themes'
import { Plus } from 'lucide-react'
import { VisitTypeList } from './visit-type-list'

const VisitDropdown = () => {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <IconButton
          className="!m-0"
          size="1"
          variant="ghost"
          color="gray"
          highContrast
        >
          <Plus width={12} height={12} />
        </IconButton>
      </Popover.Trigger>
      <Popover.Content
        side="right"
        sideOffset={2}
        minWidth="360px"
        maxWidth="380px"
        className="rounded-1 p-0"
      >
        <VisitTypeList />
      </Popover.Content>
    </Popover.Root>
  )
}

export { VisitDropdown }
