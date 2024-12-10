'use client'

import React from 'react'
import { Dialog } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { AddendumForm } from './note-detail/addendum-form'

interface CosignDialogProps {
  isOpen?: boolean
  closeDialog: () => void
}

const AddendumDialog = ({ isOpen, closeDialog }: CosignDialogProps) => {
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(dialogNewState) => {
        if (!dialogNewState && isOpen) {
          closeDialog()
        }
      }}
    >
      <Dialog.Content className="relative max-w-[646px] rounded-1 p-6">
        <Dialog.Close className="absolute right-6 top-6 cursor-pointer">
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>
        <Dialog.Title size="6" className="font-[600]">
          Addendum
        </Dialog.Title>
        <AddendumForm onCancel={closeDialog} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddendumDialog }
