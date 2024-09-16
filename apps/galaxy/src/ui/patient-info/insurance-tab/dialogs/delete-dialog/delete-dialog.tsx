'use client'

import { Dialog, Flex, Text } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { CancelButton } from './cancel-button'
import { DeleteButton } from './delete-button'

interface DeleteDialogProps {
  open?: boolean
  onClose?: () => void
}

const DeleteDialog = ({ onClose, open }: DeleteDialogProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Content className="relative max-w-[648px] rounded-2 p-6">
        <Dialog.Close className="absolute right-6 top-6 cursor-pointer">
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>
        <Dialog.Title size="6" weight="bold" className="m-0 mb-2 mt-2">
          Are you sure you want to delete?
        </Dialog.Title>
        <Flex direction="column" gap="7">
          <Text size="3" weight="regular">
            Do you really want to delete this record? The action cannot be
            undone.
          </Text>
          <Flex justify="end" gap="2">
            <CancelButton />
            <DeleteButton />
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { DeleteDialog }
