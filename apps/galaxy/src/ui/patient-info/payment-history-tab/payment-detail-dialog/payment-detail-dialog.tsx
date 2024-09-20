'use client'

import React from 'react'
import { Dialog, Flex } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { PatientInformation } from './patient-information'
import { PaymentDetailForm } from './payment-detail-form'
import { PaymentDetails } from './payment-details/payment-details'
import { PaymentInfoSection } from './payment-information'
import { PaymentOptions } from './payment-options'
import { StaffCommentsTab } from './staff-comments-tab'

interface PaymentdetailDialogProps {
  open?: boolean
  onClose?(): void
  stripeApiKey: string
  patientId: string
}

const PaymentDetailDialog = ({
  onClose,
  open,
  stripeApiKey,
  patientId,
}: PaymentdetailDialogProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Content className="relative max-w-[824px] rounded-1 p-3">
        <Dialog.Close className="absolute right-2.5 cursor-pointer">
          <X size={18} strokeWidth={1.5} />
        </Dialog.Close>
        <Dialog.Title size="5" className="!mb-0 font-[600]">
          Payment Details
        </Dialog.Title>
        <Flex direction="column" gap="2" mt="2">
          <PaymentDetailForm patientId={patientId} onClose={onClose}>
            <PatientInformation />
            <PaymentInfoSection />
            <PaymentOptions />
            <PaymentDetails stripeApiKey={stripeApiKey} patientId={patientId} />
          </PaymentDetailForm>
          <StaffCommentsTab />
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { PaymentDetailDialog }
