'use client'

import { FeatureCard } from '@/components-v2'
import { CreditCard } from '@/features/billing/credit-debit-cards/types'
import { sortCreditCardsByPrimary } from '../../utils'
import { PaymentMethodsForm } from './credit-debit-cards-form'

interface PaymentMethodsCardProps {
  creditCards: CreditCard[]
  stripeApiKey: string
}

const PaymentMethodsCard = ({
  creditCards,
  stripeApiKey,
}: PaymentMethodsCardProps) => {
  return (
    <FeatureCard title="Credit/Debit Card" contentClassName="gap-3 relative">
      <PaymentMethodsForm
        creditCards={sortCreditCardsByPrimary(creditCards)}
        stripeApiKey={stripeApiKey}
      />
    </FeatureCard>
  )
}

export { PaymentMethodsCard }
