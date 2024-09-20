'use client'

import React from 'react'
import { Dialog, Flex, ScrollArea } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { CreditCardType } from '@/constants'
import { CreditCard } from '@/types'
import {
  CreditCardsTable,
  PaymentMethodSection,
} from '@/ui/patient-info/payment-card-tab'

interface AddCardDialogProps {
  open?: boolean
  onClose?(): void
  stripeApiKey: string
  patientId: string
}
const AddCardDialog = ({
  onClose,
  open,
  stripeApiKey,
  patientId,
}: AddCardDialogProps) => {
  return (
    <Dialog.Root onOpenChange={onClose} open={open}>
      <Dialog.Content className="relative max-w-[800px] rounded-1 p-5">
        <Dialog.Close className="absolute right-5 cursor-pointer">
          <X size={22} strokeWidth={1.5} />
        </Dialog.Close>
        <Dialog.Title size="5" className="!mb-0 font-[600]">
          Add Card
        </Dialog.Title>
        <Flex direction="column" mt="5" gap="2">
          <ScrollArea className="max-h-[130px] pb-3">
            <CreditCardsTable patientCards={patientCards ?? []} />
          </ScrollArea>
          <PaymentMethodSection
            stripeApiKey={stripeApiKey}
            patientId={patientId}
          />
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}
const patientCards: CreditCard[] = [
  {
    id: 1,
    patientId: 123,
    cardType: CreditCardType.Visa,
    name: 'John Doe',
    numberLastFour: '1234',
    isActive: true,
    expireMonth: 12,
    expireYear: 2025,
    billingAddress: {
      type: 'Home', // First row has 'Home' type
      street1: '123 Main St',
      street2: 'Apt 4B',
      city: 'Somewhere',
      state: 'CA',
      country: 'USA',
      postalCode: '90001',
    },
    cardKey: 'abcd-1234',
    isPrimary: false,
  },
  {
    id: 2,
    patientId: 456,
    cardType: CreditCardType.MasterCard,
    name: 'Jane Doe',
    numberLastFour: '5678',
    isActive: false,
    expireMonth: 8,
    expireYear: 2024,
    billingAddress: {
      type: 'Mailing',
      street1: '456 Elm St',
      city: 'Anywhere',
      state: 'NY',
      country: 'USA',
      postalCode: '10001',
    },
    cardKey: 'efgh-5678',
    isPrimary: true,
  },
]

export { AddCardDialog }
