'use client'

import { useMemo } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { CreditCard } from '@/types'
import { AddCardForm } from './add-card-form'

interface PaymentMethodsProps {
  stripeApiKey: string
  onClose?(): void
  patientId: string
  patientCards?: CreditCard[]
}

const PaymentMethodSection = ({
  onClose,
  stripeApiKey,
  patientId,
  patientCards,
}: PaymentMethodsProps) => {
  const stripePromise = useMemo(() => loadStripe(stripeApiKey), [stripeApiKey])

  return (
    <Elements stripe={stripePromise}>
      <AddCardForm
        onClose={onClose}
        patientId={patientId}
        patientCards={patientCards}
      />
    </Elements>
  )
}

export { PaymentMethodSection }
