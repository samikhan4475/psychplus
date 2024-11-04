'use client'

import React from 'react'
import { Dialog, Flex, IconButton } from '@radix-ui/themes'
import { History, X } from 'lucide-react'
import { PaymentsTable } from './payments-table'
import { PrintButton } from './print-button'
import { TotalPayment } from './total-payment'

interface PatientPaymentsDialogProps {
  patientId: string
  totalPayment: string
}
const PatientPaymentsDialog = ({
  patientId,
  totalPayment,
}: PatientPaymentsDialogProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <IconButton
          color="gray"
          variant="ghost"
          size="1"
          className="text-black m-0"
        >
          <History size={14} />
        </IconButton>
      </Dialog.Trigger>
      <Dialog.Content
        className="relative max-w-[723px] rounded-1 p-3"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Flex justify="between" align="center">
          <Dialog.Title size="6" className="!mb-0 font-[600]">
            Patient Payments
          </Dialog.Title>
          <Flex gap="2" align="start">
            <PrintButton patientId={patientId} />
            <Dialog.Close className="cursor-pointer">
              <X size={20} strokeWidth={1.5} />
            </Dialog.Close>
          </Flex>
        </Flex>
        <TotalPayment totalPayment={totalPayment} />
        <PaymentsTable patientId={patientId} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { PatientPaymentsDialog }
