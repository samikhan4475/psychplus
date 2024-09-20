'use client'

import { useMemo } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { AddCardForm } from './add-card-form'
import { InfoBox } from './info-box'

interface PaymentMethodsProps {
  stripeApiKey: string
  onClose?(): void
  patientId: string
}

const PaymentMethodSection = ({
  onClose,
  stripeApiKey,
  patientId,
}: PaymentMethodsProps) => {
  const stripePromise = useMemo(() => loadStripe(stripeApiKey), [stripeApiKey])

  return (
    <>
      <InfoBox />
      <Elements stripe={stripePromise}>
        <AddCardForm onClose={onClose} patientId={patientId} />
      </Elements>
    </>
  )
}

export { PaymentMethodSection }
