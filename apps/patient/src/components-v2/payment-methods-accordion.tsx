'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { PaymentType } from '@psychplus-v2/constants'
import * as Accordion from '@radix-ui/react-accordion'
import { Box, Flex } from '@radix-ui/themes'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import {
  EmptyFileIcon,
  FeatureEmpty,
  FieldPlaceholder,
  PaymentMethodsAccordionItem,
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

  return (
    <Elements stripe={stripePromise}>
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
            content={
              <Box>
                {selectedCreditCard ? (
                  <Flex direction="column" gap="4">
                    <CreditCardListing creditCards={creditCards} />

                    <CreditCardForm
                      trigger={trigger}
                      existingCards={creditCards}
                    />
                  </Flex>
                ) : (
                  <FeatureEmpty
                    description="No Credit/Debit card added yet"
                    Icon={EmptyFileIcon}
                    action={
                      <CreditCardForm
                        trigger={trigger}
                        triggerClassName="justify-center"
                        existingCards={creditCards}
                      />
                    }
                  />
                )}
              </Box>
            }
          />
        </Accordion.Root>
      )}

      {paymentMethod === PaymentType.SelfPay && (
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
                  <CreditCardListing creditCards={creditCards} />
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
      )}
    </Elements>
  )
}

const CreditCardListing = ({ creditCards }: { creditCards: CreditCard[] }) => {
  return (
    <Flex direction="column" width="100%" gap="3">
      {creditCards.map((card) => (
        <Flex
          key={card.cardKey}
          p="3"
          className="w-full rounded-2 border border-[#DDDDE3]"
          justify="between"
          align="center"
        >
          <Box className="w-[98%]">
            <CreditCardListItem creditCard={card} />
          </Box>
        </Flex>
      ))}
    </Flex>
  )
}

export { PaymentMethodAccordion }
