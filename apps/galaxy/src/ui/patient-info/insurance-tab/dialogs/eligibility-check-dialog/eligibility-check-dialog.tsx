'use client'

import { Dialog } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { EligibilityCheckForm } from './eligibility-check-form'

interface EligibilityCheckDialogProps {
  open?: boolean
  onClose?: () => void
}
const EligibilityCheckDialog = ({
  open,
  onClose,
}: EligibilityCheckDialogProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Content className="relative max-w-[648px] rounded-2 px-6 py-7 ">
        <Dialog.Close className="absolute right-6 top-6 cursor-pointer">
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>
        <Dialog.Title size="5" weight="bold" className="m-0 mb-1.5">
          Eligibility Check
        </Dialog.Title>
        <EligibilityCheckForm />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { EligibilityCheckDialog }
