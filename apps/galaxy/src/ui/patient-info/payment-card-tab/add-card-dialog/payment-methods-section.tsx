'use client'

import { useMemo } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { AddCardForm } from './add-card-form'

interface PaymentMethodsProps {
  stripeApiKey: string
  onClose(): void
}

const PaymentMethodSection = ({
  onClose,
  stripeApiKey,
}: PaymentMethodsProps) => {
  const stripePromise = useMemo(() => loadStripe(stripeApiKey), [stripeApiKey])

  return (
    <Elements stripe={stripePromise}>
      <AddCardForm onClose={onClose} />
    </Elements>
  )
}

export { PaymentMethodSection }
