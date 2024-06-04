'use client'

import { useMemo } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { FeatureCard } from '@/components-v2'
import { CreditCard } from '@/features/billing/credit-debit-cards/types'
import { PaymentMethodsForm } from './credit-debit-cards-form'

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
        id="credit-debit-cards"
        title="Credit/Debit Cards"
        contentClassName="gap-3"
      >
        <PaymentMethodsForm creditCards={creditCards} />
      </FeatureCard>
    </Elements>
  )
}

export { PaymentMethodsCard }
