'use client'

import React, { useState } from 'react'
import { Cross1Icon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex, IconButton } from '@radix-ui/themes'
import { ActiveVisitForm } from './active-visit-form'
import { ActiveVisitTable } from './active-visit-table'

const ActiveVisitDialog = () => {
  const [isOpen, setIsOpen] = useState(false)
  const onToggle = (open: boolean) => setIsOpen(open)

  return (
    <Dialog.Root open={isOpen} onOpenChange={onToggle}>
      <Dialog.Trigger>
        <Button variant="outline" color="gray" size="1" className="text-black">
          Active Clinic Visits
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="relative max-w-[900px] overflow-visible rounded-4">
        <Dialog.Close className="absolute right-4 top-5 cursor-pointer">
          <IconButton size="1" highContrast variant="ghost" color="gray">
            <Cross1Icon width={20} height={20} strokeWidth={1.5} />
          </IconButton>
        </Dialog.Close>
        <Dialog.Title>Active Clinic Visits</Dialog.Title>
        <Flex direction="column" gap="2">
          <ActiveVisitForm />
          <ActiveVisitTable />
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ActiveVisitDialog }
