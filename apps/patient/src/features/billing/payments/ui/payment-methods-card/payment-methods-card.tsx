'use client'

import { useMemo } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { FeatureCard } from '@/components-v2'
import { CreditCard } from '@/features/billing/payments/types'
import { PaymentMethodsForm } from './payment-methods-form'

interface PaymentMethodsCardProps {
  creditCards: CreditCard[]
  stripeApiKey: string
}

const PaymentMethodsCard = ({
  creditCards,
  stripeApiKey,
}: PaymentMethodsCardProps) => {
  const stripePromise = useMemo(() => loadStripe(stripeApiKey), [stripeApiKey])

  return (
    <Elements stripe={stripePromise}>
      <FeatureCard
        id="payment-methods"
        title="Payment Methods"
        contentClassName="gap-3"
      >
        <PaymentMethodsForm creditCards={creditCards} />
      </FeatureCard>
    </Elements>
  )
}

export { PaymentMethodsCard }
