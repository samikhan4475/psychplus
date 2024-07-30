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
import { InsurancePolicyPriority } from '@/features/billing/payments/constants'
import { Insurance, InsurancePayer } from '@/features/billing/payments/types'
import { InsuranceForm } from '@/features/billing/payments/ui/insurance-card/insurance-form'
import { InsuranceFormTrigger } from '@/features/billing/payments/ui/insurance-card/Insurance-form-trigger'

interface PaymentMethodAccordionProps {
  paymentMethod: PaymentType
  stripeApiKey: string
  creditCards: CreditCard[]
  patientInsurances: Insurance[]
  insurancePayers: InsurancePayer[]
}

const PaymentMethodAccordion = ({
  paymentMethod,
  stripeApiKey,
  creditCards,
  patientInsurances,
  insurancePayers,
}: PaymentMethodAccordionProps) => {
  const stripePromise = useMemo(() => loadStripe(stripeApiKey), [stripeApiKey])
  const [creditCardOpenStateValue, setCreditCardOpenStateValue] =
    useState<string>('Credit/Debit Cards')
  const [insuranceOpenStateValue, setInsuranceOpenStateValue] =
    useState<string>('Insurance on File')

  const [selectedCreditCard, setSelectedCreditCard] = useState<
    CreditCard | undefined
  >(creditCards?.[0])

  const hasPrimaryInsurance = patientInsurances.some(
    (insurance) =>
      insurance.insurancePolicyPriority === InsurancePolicyPriority.Primary,
  )
  const hasSecondaryInsurance = patientInsurances.some(
    (insurance) =>
      insurance.insurancePolicyPriority === InsurancePolicyPriority.Secondary,
  )
  const hasTertiaryInsurance = patientInsurances.some(
    (insurance) =>
      insurance.insurancePolicyPriority === InsurancePolicyPriority.Tertiary,
  )

  let insurancePriority = InsurancePolicyPriority.Other

  if (!hasPrimaryInsurance) {
    insurancePriority = InsurancePolicyPriority.Primary
  } else if (!hasSecondaryInsurance) {
    insurancePriority = InsurancePolicyPriority.Secondary
  } else if (!hasTertiaryInsurance) {
    insurancePriority = InsurancePolicyPriority.Tertiary
  }

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
          value={insuranceOpenStateValue}
          onValueChange={(value) => setInsuranceOpenStateValue(value)}
        >
          <PaymentMethodsAccordionItem
            title="Insurance on File"
            content={
              <Flex width="100%" gap="2" direction="column">
                {
                  patientInsurances.map((insurance) => (
                  <InsuranceForm
                    key={insurance.id}
                    insurance={insurance}
                    insurancePayers={insurancePayers}
                    insurancePriority={ insurance.insurancePolicyPriority as InsurancePolicyPriority
                    }
                    trigger={<InsuranceFormTrigger insurance={insurance} />}
                  />    
                  ))
                }
              </Flex>
            }
          />
          <PaymentMethodsAccordionItem
            title="Add/Edit Insurance"
            content={
              <InsuranceForm
                insurancePriority={insurancePriority}
                insurancePayers={insurancePayers}
                onFormClose={() =>
                  setInsuranceOpenStateValue('Insurance on File')
                }
              />
            }
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
