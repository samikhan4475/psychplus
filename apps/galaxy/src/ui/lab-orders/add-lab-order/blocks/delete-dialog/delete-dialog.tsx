'use client'

import { Dialog, Flex } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { CancelButton } from './cancel-button'
import { DeleteButton } from './delete-button'

interface DeleteDialogProps {
  open: boolean
  onClose: (value: boolean) => void
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const DeleteDialog = ({ onClose, open, onClick }: DeleteDialogProps) => {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(dialogNewState) => {
        if (!dialogNewState && open) {
          onClose(false)
        }
      }}
    >
      <Dialog.Content className="relative max-w-[648px] rounded-2 p-6">
        <Dialog.Close className="absolute right-6 top-6 cursor-pointer">
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>
        <Dialog.Title size="6" weight="bold" className="m-0 mb-2 mt-2">
          Are you sure you want to delete?
        </Dialog.Title>
        <Flex justify="end" gap="2">
          <CancelButton />
          <DeleteButton onClick={onClick} />
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { DeleteDialog }
