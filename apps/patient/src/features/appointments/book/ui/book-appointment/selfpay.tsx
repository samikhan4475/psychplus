'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { Box } from '@radix-ui/themes'
import { PaymentMethodsAccordionItem } from '@/components-v2'
import { CreditCard } from '@/features/billing/credit-debit-cards/types'
import { CreditCardForm } from '@/features/billing/credit-debit-cards/ui/credit-debit-cards-card/credit-debit-card-form'
import CreditCardList from '@/features/call/blocks/credit-card-list'
import CreditCardContent from './credit-card-content'

interface SelfPaySectionProps {
  creditCards: CreditCard[]
  isCall: boolean
  creditCardOpenStateValue: string
  setCreditCardOpenStateValue: (value: string) => void
  selectedCreditCard?: CreditCard
  isUnAuthenticated?: boolean
}

const SelfPaySection = ({
  creditCards,
  isCall,
  creditCardOpenStateValue,
  setCreditCardOpenStateValue,
  selectedCreditCard,
  isUnAuthenticated = false
}: SelfPaySectionProps) => {
  return (
    <Accordion.Root
      type="single"
      className="w-full"
      value={creditCardOpenStateValue}
      onValueChange={setCreditCardOpenStateValue}
    >
      {isCall && !isUnAuthenticated ? (
        selectedCreditCard && <CreditCardList creditCards={creditCards} />
      ) : (
        <PaymentMethodsAccordionItem
          title="Credit/Debit Cards"
          content={
            <Box>
              <CreditCardContent
                selectedCreditCard={selectedCreditCard}
                creditCards={creditCards}
                setCreditCardOpenStateValue={setCreditCardOpenStateValue}
              />
            </Box>
          }
        />
      )}
      <PaymentMethodsAccordionItem
        title={isCall ? 'Add Payment Card' : 'Add New Card'}
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
    </Accordion.Root>
  )
}

export default SelfPaySection
