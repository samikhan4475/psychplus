'use client'

import { Dialog } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { HxFilterForm } from './hx-filter-form'
import { HxTable } from './hx-table'

interface HxDialogProps {
  patientId: string
  open: boolean
  onClose(): void
}

const HxDialog = ({ open, onClose, patientId }: HxDialogProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Content className="max-w-[848px] rounded-1 p-6">
        <Dialog.Title size={'5'} className="mb-2">
          PCP Hx
        </Dialog.Title>
        <Dialog.Close className="absolute right-6 top-6 cursor-pointer">
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>
        <HxFilterForm patientId={patientId} />
        <HxTable patientId={patientId} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { HxDialog }
