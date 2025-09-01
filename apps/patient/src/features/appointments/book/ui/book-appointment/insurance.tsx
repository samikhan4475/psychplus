'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { Box, Flex } from '@radix-ui/themes'
import {
  EmptyFileIcon,
  FeatureEmpty,
  PaymentMethodsAccordionItem,
  TriggerButton,
} from '@/components-v2'
import { CreditCard } from '@/features/billing/credit-debit-cards/types'
import { CreditCardForm } from '@/features/billing/credit-debit-cards/ui/credit-debit-cards-card/credit-debit-card-form'
import {
  InsurancePayer,
  InsurancePolicy,
} from '@/features/billing/payments/types'
import { InsuranceForm } from '@/features/billing/payments/ui/insurance-card/insurance-form'
import CreditCardList from '@/features/call/blocks/credit-card-list'
import InsuranceList from '@/features/call/blocks/insurance-list'
import CreditCardListing from './credit-card-listing'
import InsuranceContent from './insurance-content'

interface InsurancePaymentSectionProps {
  patientInsurances: InsurancePolicy[]
  insurancePayers: InsurancePayer[]
  creditCards: CreditCard[]
  isCall: boolean
  insuranceOpenStateValue: string
  setInsuranceOpenStateValue: (value: string) => void
  setCreditCardOpenStateValue: (value: string) => void
  selectedCreditCard?: CreditCard
  shouldHideSelfPay: boolean
  isUnAuthenticated?: boolean
}

const InsurancePaymentSection = ({
  patientInsurances,
  insurancePayers,
  creditCards,
  isCall,
  insuranceOpenStateValue,
  setInsuranceOpenStateValue,
  setCreditCardOpenStateValue,
  selectedCreditCard,
  shouldHideSelfPay,
  isUnAuthenticated = false
}: InsurancePaymentSectionProps) => {
  return (
    <Accordion.Root
      type="single"
      className="w-full"
      defaultValue={insuranceOpenStateValue}
      value={insuranceOpenStateValue}
      onValueChange={setInsuranceOpenStateValue}
    >
      {!isUnAuthenticated && ( isCall ? (
        <InsuranceList
          patientInsurances={patientInsurances}
          insurancePayers={insurancePayers}
          isCall={isCall}
          isUnAuthenticated={isUnAuthenticated}
        />
      ) : (
        <PaymentMethodsAccordionItem
          title="Insurance on File"
          content={
            <Box>
              <InsuranceContent
                patientInsurances={patientInsurances}
                insurancePayers={insurancePayers}
                setInsuranceOpenStateValue={setInsuranceOpenStateValue}
              />
            </Box>
          }
        />
      ))}
      <PaymentMethodsAccordionItem
        title={isCall ? 'Add Insurance' : 'Add/Edit Insurance'}
        content={
          <InsuranceForm
            isCall={isCall}
            insurancePayers={insurancePayers}
            onFormClose={() => setInsuranceOpenStateValue('Insurance on File')}
            isUnAuthenticated={isUnAuthenticated}
          />
        }
      />
      {isCall && selectedCreditCard && !isUnAuthenticated && (
        <CreditCardList creditCards={creditCards} />
      )}
      {isCall && !shouldHideSelfPay && (
        <PaymentMethodsAccordionItem
          title="Add Payment Card"
          content={
            <CreditCardForm
              isCall={isCall}
              existingCards={creditCards}
              onFormClose={() =>
                setCreditCardOpenStateValue('Credit/Debit Cards')
              }
              isUnAuthenticated={isUnAuthenticated}
            />
          }
        />
      )}
      {!isCall && (
        <PaymentMethodsAccordionItem
          title="Credit/Debit Card Details"
          content={
            <Box>
              {selectedCreditCard ? (
                <Flex direction="column" gap="4">
                  <CreditCardListing creditCards={creditCards} />
                  <CreditCardForm
                    trigger={
                      <TriggerButton title="Add New Credit/Debit Card" />
                    }
                    existingCards={creditCards}
                    isUnAuthenticated={isUnAuthenticated}
                  />
                </Flex>
              ) : (
                <FeatureEmpty
                  description="No Credit/Debit card added yet"
                  Icon={EmptyFileIcon}
                  action={
                    <CreditCardForm
                      trigger={
                        <TriggerButton title="Add New Credit/Debit Card" />
                      }
                      triggerClassName="justify-center"
                      existingCards={creditCards}
                      isUnAuthenticated={isUnAuthenticated}
                    />
                  }
                />
              )}
            </Box>
          }
        />
      )}
    </Accordion.Root>
  )
}

export default InsurancePaymentSection
