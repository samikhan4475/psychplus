'use client'

import { Dialog } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { AddTemplateForm } from './add-template-form'

interface AddTemplateDialogProps {
  open?: boolean
  onClose?: () => void
}
const AddTemplateDialog = ({ open, onClose }: AddTemplateDialogProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Content className="relative max-w-[800px] rounded-3 p-6">
        <Dialog.Close className="absolute right-6 top-6 cursor-pointer">
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>
        <Dialog.Title size="5" className="font-medium">
          Add New Template
        </Dialog.Title>
        <AddTemplateForm />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddTemplateDialog }
