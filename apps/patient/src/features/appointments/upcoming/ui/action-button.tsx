'use client'

import { useState } from 'react'
import { Button, Dialog, Flex } from '@radix-ui/themes'
import { CloseDialogIcon, UnderConstruction } from '@/components-v2'

interface ActionButtonParams {
  label: string
  isActive?: boolean
}

const ActionButton = ({ label, isActive = false }: ActionButtonParams) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button variant={!isActive ? 'outline' : undefined} highContrast>
          {label}
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="relative">
        <CloseDialogIcon />
        <UnderConstruction />
        <Flex gap="3" mt="4" justify="center">
          <Dialog.Close>
            <Button variant="outline" color="gray" highContrast>
              Close
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ActionButton }
