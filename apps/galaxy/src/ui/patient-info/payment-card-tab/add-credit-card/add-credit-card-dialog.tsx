'use client'

import { Dialog } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { GooglePlacesContextProvider } from '@/providers/google-places-provider'
import { CreditCard } from '@/types'
import { PaymentMethodSection } from './payment-methods-section'

interface AddCardDialogProps {
  open: boolean
  onClose (): void
  stripeApiKey: string
  patientId: string
  googleApiKey: string
  patientCards: CreditCard[]
}
const AddCreditCardDialog = ({
  open,
  onClose,
  stripeApiKey,
  patientId,
  googleApiKey,
  patientCards,
}: AddCardDialogProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Content className="max-w-[848px] !overflow-visible rounded-1 p-6">
        <Dialog.Title size={'5'} className="mb-2">
          Add Card
        </Dialog.Title>
        <Dialog.Close className="absolute right-6 top-6 cursor-pointer">
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>
        <GooglePlacesContextProvider apiKey={googleApiKey}>
          <PaymentMethodSection
            stripeApiKey={stripeApiKey}
            patientCards={patientCards}
            onClose={onClose}
            patientId={patientId}
          />
        </GooglePlacesContextProvider>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddCreditCardDialog }
