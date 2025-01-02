import React, { useMemo } from 'react'
import { Box, Flex, Separator, Text } from '@radix-ui/themes'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { EmptyFileIcon, FeatureEmpty } from '@/components-v2'
import { CreditCard } from '@/features/billing/credit-debit-cards/types'
import { CreditCardForm } from '@/features/billing/credit-debit-cards/ui/credit-debit-cards-card/credit-debit-card-form'
import CardListitem from './card-list-item'

interface PaymentMethodsCardProps {
  creditCards: CreditCard[]
  stripeApiKey: string
}

const Payments = ({ stripeApiKey, creditCards }: PaymentMethodsCardProps) => {
  const stripePromise = useMemo(() => loadStripe(stripeApiKey), [stripeApiKey])

  const trigger = (
    <Text
      weight="medium"
      className="mt-[2px] flex cursor-pointer items-center rounded-6 border px-3 py-2 text-[15px] text-[#194595]"
    >
      + Add New Credit/Debit Card
    </Text>
  )

  return (
    <Elements stripe={stripePromise}>
      <Flex
        direction="column"
        className="bg-white gap-3 border-b-gray-5 p-4 first:border-b xs:rounded-2 xs:border xs:border-gray-5"
      >
        <Flex align="start" py="2" px="3" className="" direction={'column'}>
          <Text className="text-[20px] font-[600] xs:text-[16px]">
            Credit/Debit Cards
          </Text>
          <Box className="bg-[#F9F9FB] p-3">
            <Text className="text-[13px] text-[#60646C]">
              <Text className="inline" weight={'medium'}>
                NOTE:
              </Text>{' '}
              All virtual visits that may have a co-pay, co-insurance,
              deductible, or are self-pay, a Credit Card is required to proceed.
              If the visit is in-person, you may bring a form of payment with
              you to your visit. Credit card on file is ONLY charged after the
              visit is completed and not prior to the visit, unless explicitly
              agreed upon by the card holder in writing prior to the
              transaction.
            </Text>
          </Box>
        </Flex>
        <Flex direction="column" py="5" px="5" className="gap-3">
          <Box>
            {creditCards.length > 0 ? (
              <Flex direction="column" width="100%" gap="2">
                {creditCards.map((creditCard) => (
                  <Flex
                    className="w-full"
                    direction="column"
                    key={creditCard.id}
                  >
                    <CardListitem creditCard={creditCard} />
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
      </Flex>
    </Elements>
  )
}

export default Payments
