'use client'

import React from 'react'
import { Button, Dialog, Flex } from '@radix-ui/themes'
import { CirclePlus, X } from 'lucide-react'
import { GooglePlacesContextProvider } from '@/providers/google-places-provider'
import { PaymentMethodSection } from '@/ui/patient-info/payment-card-tab'
import { useStore } from '../store'
import { CreditCardsTable } from './cards-table'

interface AddCardDialogProps {
  stripeApiKey: string
  patientId: string
  googleApiKey: string
}
const AddCardDialog = ({
  stripeApiKey,
  patientId,
  googleApiKey,
}: AddCardDialogProps) => {
  const { fetchPatientCreditCards, openAddCardDialog, toggleAddCardDialog } =
    useStore((state) => ({
      fetchPatientCreditCards: state.fetchPatientCreditCards,
      openAddCardDialog: state.openAddCardDialog,
      toggleAddCardDialog: state.toggleAddCardDialog,
    }))

  const OnClose = () => {
    fetchPatientCreditCards(patientId)
    toggleAddCardDialog()
  }
  return (
    <Dialog.Root onOpenChange={toggleAddCardDialog} open={openAddCardDialog}>
      <Dialog.Trigger>
        <Button variant="ghost" size="1" type="button" highContrast>
          <CirclePlus size={16} /> Add Card / Change Card
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="relative max-w-[991px] !overflow-visible rounded-1 p-5">
        <Dialog.Close className="absolute right-5 cursor-pointer">
          <X size={22} strokeWidth={1.5} />
        </Dialog.Close>
        <Dialog.Title size="5" className="!mb-0 font-[600]">
          Add Card
        </Dialog.Title>
        <Flex direction="column" mt="5" gap="2">
          <CreditCardsTable />
          <GooglePlacesContextProvider apiKey={googleApiKey}>
            <PaymentMethodSection
              stripeApiKey={stripeApiKey}
              patientId={patientId}
              onClose={OnClose}
            />
          </GooglePlacesContextProvider>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddCardDialog }
