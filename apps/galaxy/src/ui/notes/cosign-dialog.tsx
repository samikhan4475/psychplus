'use client'

import React from 'react'
import { Dialog } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { CosignDialogForm } from './cosign-dialog-form'

interface CosignDialogProps {
  isOpen?: boolean
  closeDialog: () => void
}

const CosignDialog = ({ isOpen, closeDialog }: CosignDialogProps) => {
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
          Send to Co-Signer
        </Dialog.Title>
        <CosignDialogForm closeDialog={closeDialog} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { CosignDialog }
