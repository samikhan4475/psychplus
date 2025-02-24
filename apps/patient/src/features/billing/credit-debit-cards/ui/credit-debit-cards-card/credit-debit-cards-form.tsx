import React, { useMemo } from 'react'
import { Box, Flex, Separator, Text } from '@radix-ui/themes'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import {
  CreditDebitCardsIcon,
  EmptyFileIcon,
  FeatureEmpty,
  TriggerButton,
} from '@/components-v2'
import { CreditCard } from '@/features/billing/credit-debit-cards/types'
import { CreditCardForm } from '@/features/billing/credit-debit-cards/ui/credit-debit-cards-card/credit-debit-card-form'
import { CreditCardListItem } from './credit-debit-card-list-item'

interface PaymentMethodsCardProps {
  creditCards: CreditCard[]
  stripeApiKey: string
}

const PaymentMethodsForm = ({ stripeApiKey, creditCards }: PaymentMethodsCardProps) => {
  const stripePromise = useMemo(() => loadStripe(stripeApiKey), [stripeApiKey])

  const trigger = <TriggerButton title="Add New Credit/Debit Card" />

  return (
    <Elements stripe={stripePromise}>
      <Flex
        className="w-full rounded-1 border border-gray-6"
        px="2"
        py="1"
        align="center"
        justify="between"
        gap="2"
      >
        <Text size="2" weight="medium" className="whitespace-nowrap">
          We accept all major Credit & Debit Cards
        </Text>

        <Flex>
          <CreditDebitCardsIcon />
        </Flex>
      </Flex>
      <Flex align="start" direction="column">
        <Box className="bg-[#F9F9FB] p-3">
          <Text className="text-[13px] text-[#60646C]">
            <Text className="inline" weight={'medium'}>
              NOTE:
            </Text>{' '}
            All virtual visits that may have a co-pay, co-insurance, deductible,
            or are self-pay, a Credit Card is required to proceed. If the visit
            is in-person, you may bring a form of payment with you to your
            visit. Credit card on file is ONLY charged after the visit is
            completed and not prior to the visit, unless explicitly agreed upon
            by the card holder in writing prior to the transaction.
          </Text>
        </Box>
      </Flex>
      <Flex direction="column" mt="2" className="gap-3">
        <Box>
          {creditCards.length > 0 ? (
            <Flex direction="column" width="100%" gap="2">
              {creditCards.map((creditCard) => (
                <Flex className="w-full" direction="column" key={creditCard.id}>
                  <CreditCardListItem creditCard={creditCard} />
                  <Separator className="w-full" my="4" />
                </Flex>
              ))}
              <CreditCardForm
                trigger={trigger}
                existingCards={creditCards}
                triggerClassName="justify-start items-start"
              />
            </Flex>
          ) : (
            <FeatureEmpty
              description="No Credit/Debit card added yet"
              action={
                <CreditCardForm
                  trigger={trigger}
                  triggerClassName="justify-center"
                  existingCards={creditCards}
                />
              }
              Icon={EmptyFileIcon}
            />
          )}
        </Box>
      </Flex>
    </Elements>
  )
}

export { PaymentMethodsForm }
