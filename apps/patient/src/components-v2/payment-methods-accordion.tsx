'use client'

import React, { useMemo, useState } from 'react'
import { PaymentType } from '@psychplus-v2/constants'
import * as Accordion from '@radix-ui/react-accordion'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { PaymentMethodsAccordionItem } from '@/components-v2'
import { CreditCard } from '@/features/billing/credit-debit-cards/types'
import { CreditCardForm } from '@/features/billing/credit-debit-cards/ui/credit-debit-cards-card/credit-debit-card-form'

interface PaymentMethodAccordionProps {
  paymentMethod: PaymentType
  stripeApiKey: string
  creditCards: CreditCard[]
}

const PaymentMethodAccordion = ({
  paymentMethod,
  stripeApiKey,
  creditCards,
}: PaymentMethodAccordionProps) => {
  const stripePromise = useMemo(() => loadStripe(stripeApiKey), [stripeApiKey])
  const [creditCardOpenStateValue, setCreditCardOpenStateValue] =
    useState<string>('Credit/Debit Cards')

  return (
    <>
      {paymentMethod === PaymentType.Insurance && (
        <Accordion.Root
          type="single"
          className="w-full"
          defaultValue="Insurance on File"
        >
          <PaymentMethodsAccordionItem
            title="Insurance on File"
            content="Insurance on file listing here"
          />
          <PaymentMethodsAccordionItem
            title="Add/Edit Insurance"
            content="Add/Edit Insurance form here"
          />
          <PaymentMethodsAccordionItem
            title="Credit Card Details (Optional)"
            content="Credit Card Details (Optional)"
          />
        </Accordion.Root>
      )}

      {paymentMethod === PaymentType.SelfPay && (
        <Elements stripe={stripePromise}>
          <Accordion.Root
            type="single"
            className="w-full"
            value={creditCardOpenStateValue}
            onValueChange={(value) => setCreditCardOpenStateValue(value)}
          >
            <PaymentMethodsAccordionItem
              title="Credit/Debit Cards"
              content="Add Credit/Debit Cards Listing here"
            />
            <PaymentMethodsAccordionItem
              title="Add New Card"
              content={
                <CreditCardForm
                  existingCards={creditCards}
                  onFormClose={() =>
                    setCreditCardOpenStateValue('Credit/Debit Cards')
                  }
                />
              }
            />
          </Accordion.Root>
        </Elements>
      )}
    </>
  )
}

export { PaymentMethodAccordion }
