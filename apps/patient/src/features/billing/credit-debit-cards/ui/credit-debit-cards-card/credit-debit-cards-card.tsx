'use client'

import { CreditCard } from '@/features/billing/credit-debit-cards/types'
import { PaymentMethodsForm } from './credit-debit-cards-form'
import { sortCreditCardsByPrimary } from '../../utils'

interface PaymentMethodsCardProps {
  creditCards: CreditCard[]
  stripeApiKey: string
}

const PaymentMethodsCard = ({
  creditCards,
  stripeApiKey,
}: PaymentMethodsCardProps) => {
  return (
    <PaymentMethodsForm creditCards={sortCreditCardsByPrimary(creditCards)} stripeApiKey={stripeApiKey} />
  )
}

export { PaymentMethodsCard }
