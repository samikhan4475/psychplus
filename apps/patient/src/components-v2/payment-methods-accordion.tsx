'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { PaymentType } from '@psychplus-v2/constants'
import * as Accordion from '@radix-ui/react-accordion'
import { Box, Flex, RadioGroup } from '@radix-ui/themes'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { cn } from '@psychplus/ui/cn'
import {
  EmptyFileIcon,
  FeatureEmpty,
  FieldPlaceholder,
  PaymentMethodsAccordionItem,
  RadioGroupItem,
} from '@/components-v2'
import { CreditCard } from '@/features/billing/credit-debit-cards/types'
import { CreditCardForm } from '@/features/billing/credit-debit-cards/ui/credit-debit-cards-card/credit-debit-card-form'
import { CreditCardListItem } from '@/features/billing/credit-debit-cards/ui/credit-debit-cards-card/credit-debit-card-list-item'

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
  const [selectedCreditCard, setSelectedCreditCard] = useState<
    CreditCard | undefined
  >(creditCards?.[0])

  const trigger = <FieldPlaceholder>+ Add New Credit Card</FieldPlaceholder>

  useEffect(() => {
    setSelectedCreditCard(creditCards.length > 0 ? creditCards[0] : undefined)
  }, [creditCards])

  const getBorderColor = (creditCardId: number) => {
    return creditCardId === selectedCreditCard?.id
      ? 'border-[#194595]'
      : 'border-[#DDDDE3]'
  }

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
              content={
                <Box>
                  {selectedCreditCard ? (
                    <RadioGroup.Root
                      name="credit card listing"
                      value={selectedCreditCard.cardKey}
                      onValueChange={(value) => {
                        const selectedCard = creditCards.find(
                          (card) => card.cardKey === value,
                        )
                        if (selectedCard) {
                          setSelectedCreditCard(selectedCard)
                        }
                      }}
                    >
                      <Flex direction="column" width="100%" gap="3">
                        {creditCards.map((card) => (
                          <Flex
                            key={card.cardKey}
                            p="3"
                            className={cn(
                              'w-full rounded-2 border',
                              getBorderColor(card.id),
                            )}
                            justify="between"
                            align="center"
                          >
                            <Box className="w-[98%]">
                              <CreditCardListItem creditCard={card} />
                            </Box>
                            <RadioGroupItem
                              key={card.cardKey}
                              id={card.cardKey}
                              value={card.cardKey}
                            />
                          </Flex>
                        ))}
                      </Flex>
                    </RadioGroup.Root>
                  ) : (
                    <Flex direction="column" align="center">
                      <FeatureEmpty
                        description="No Credit/Debit card added yet"
                        Icon={EmptyFileIcon}
                      />
                      <Flex mt="-7">
                        <Box
                          className="w-full"
                          onClick={() => {
                            setCreditCardOpenStateValue('Add New Card')
                          }}
                        >
                          {trigger}
                        </Box>
                      </Flex>
                    </Flex>
                  )}
                </Box>
              }
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
