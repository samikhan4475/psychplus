'use client'

import React, { PropsWithChildren, useState } from 'react'
import { Dialog } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { Appointment } from '@/types'
import { PaymentSection } from './payment-section'

interface Props {
  stripeApiKey: string
  patientId: string
  googleApiKey: string
  appointment?: Appointment
  onClose?: () => void
}

const PaymentDialog = ({
  children,
  stripeApiKey,
  patientId,
  googleApiKey,
  appointment,
  onClose
}: PropsWithChildren<Props>) => {
  const [open, setOpen] = useState(false)
  const toggleOpen = () => {
    setOpen((prev) => !prev)
  }

  return (
    <Dialog.Root open={open} onOpenChange={toggleOpen}>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content className="relative max-w-[824px] rounded-1 p-3">
        <Dialog.Close className="absolute right-2.5 cursor-pointer">
          <X size={18} strokeWidth={1.5} />
        </Dialog.Close>
        <Dialog.Title size="5" className="!mb-0 font-[600]">
          Payment Details
        </Dialog.Title>
        <PaymentSection
          toggleOpen={toggleOpen}
          onClose={onClose}
          patientId={patientId}
          googleApiKey={googleApiKey}
          stripeApiKey={stripeApiKey}
          appointment={appointment}
        />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { PaymentDialog }
