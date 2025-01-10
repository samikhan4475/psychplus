'use client'

import { Dialog, Flex, Text, Tooltip } from '@radix-ui/themes'
import { Trash2, X } from 'lucide-react'
import { CancelButton } from './cancel-button'
import { DeleteButton } from './delete-button'

interface DeleteDialogProps {
  handleDelete: () => void
}

const DeleteDialog = ({ handleDelete }: DeleteDialogProps) => {
  return (
    <Dialog.Root>
      <Tooltip content="Delete" side="top" align="center">
        <Dialog.Trigger>
          <Trash2 color="black" width={14} height={14} />
        </Dialog.Trigger>
      </Tooltip>
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
            <DeleteButton onClick={handleDelete} />
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { DeleteDialog }
