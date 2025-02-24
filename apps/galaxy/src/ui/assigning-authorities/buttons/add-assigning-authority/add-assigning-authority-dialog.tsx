'use client'

import { useState } from 'react'
import { Button, Dialog, Flex } from '@radix-ui/themes'
import { PlusIcon, X } from 'lucide-react'
import { AddAssigningAuthorityForm } from './add-assigning-authority-form'

const AddAssigningAuthorityButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const handleClose = () => setIsOpen(false)

  return (
    <Dialog.Root open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <Dialog.Trigger>
        <Button size="1" highContrast type="button" className="ml-auto">
          <PlusIcon size={14} width={14} strokeWidth={2} /> Assigning
          Authorities
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="w-[600px] rounded-2 p-5">
        <Flex justify="between" align="start" gap="2">
          <Dialog.Title size="5" weight="bold">
            Assigning Authority
          </Dialog.Title>

          <Dialog.Close className="cursor-pointer">
            <X size={22} strokeWidth={1} />
          </Dialog.Close>
        </Flex>
        <AddAssigningAuthorityForm onClose={handleClose} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddAssigningAuthorityButton }
