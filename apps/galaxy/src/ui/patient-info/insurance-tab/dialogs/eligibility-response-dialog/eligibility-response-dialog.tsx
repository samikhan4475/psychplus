'use client'

import { Dialog } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { EligibilityAccordian } from './eligibility-accordian'

interface EligibilityResponseDialog {
  open?: boolean
  onClose?: () => void
}
const EligibilityResponseDialog = ({
  open,
  onClose,
}: EligibilityResponseDialog) => {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Content className="relative max-w-[1121px] rounded-2 px-6 py-4 ">
        <Dialog.Close className="absolute right-6 top-6 cursor-pointer">
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>
        <Dialog.Title size="5" weight="bold" className="m-0 mt-3">
          Eligibility Response
        </Dialog.Title>
        <EligibilityAccordian />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { EligibilityResponseDialog }
