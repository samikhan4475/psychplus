'use client'

import { useState } from 'react'
import { Button } from '@radix-ui/themes'
import { CreditCard } from 'lucide-react'
import { PaymentDetailDialog } from './payment-detail-dialog'

interface PaymentButtonProps {
  stripeApiKey: string
  patientId: string
}
const PaymentButton = ({ stripeApiKey, patientId }: PaymentButtonProps) => {
  const [open, setOpen] = useState(false)
  const onOpen = () => setOpen(true)
  const onClose = () => setOpen(false)
  return (
    <>
      <Button size="1" highContrast onClick={onOpen}>
        <CreditCard width={12} height={12} />
        Payment
      </Button>
      <PaymentDetailDialog
        patientId={patientId}
        open={open}
        onClose={onClose}
        stripeApiKey={stripeApiKey}
      />
    </>
  )
}

export { PaymentButton }
