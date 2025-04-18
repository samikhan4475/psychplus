'use client'

import React, { PropsWithChildren, useState } from 'react'
import { Dialog, Flex } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { AddStaffDialogForm } from './add-staff-dialog-form'

const AddStaffDialog = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false)

  const onToggle = (open: boolean) => setIsOpen(open)

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => onToggle(open)}>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content className="w-[721px] rounded-2 p-6">
        <Flex justify="between" align="start" gap="2">
          <Dialog.Title size="5" weight="medium">
            Add Staff
          </Dialog.Title>
          <Dialog.Close className="cursor-pointer">
            <X size={22} strokeWidth={1} />
          </Dialog.Close>
        </Flex>
        <AddStaffDialogForm onClose={onToggle} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddStaffDialog }
