'use client'

import { Dialog } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { InfoBox } from './info-box'
import { PaymentMethodSection } from './payment-methods-section'

interface AddCardDialogProps {
  open: boolean
  onClose(): void
  stripeApiKey: string
}
const AddCardDialog = ({ open, onClose, stripeApiKey }: AddCardDialogProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Content className="max-w-[848px] rounded-1 p-6">
        <Dialog.Title size={'5'} className="mb-2">
          Add Card
        </Dialog.Title>
        <Dialog.Close className="absolute right-6 top-6 cursor-pointer">
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>
        <InfoBox />
        <PaymentMethodSection stripeApiKey={stripeApiKey} onClose={onClose} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddCardDialog }
