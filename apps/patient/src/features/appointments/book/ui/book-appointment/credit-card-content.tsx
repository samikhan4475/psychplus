'use client'

import { Box, Flex } from '@radix-ui/themes'
import { EmptyFileIcon, FeatureEmpty, TriggerButton } from '@/components-v2'
import { CreditCard } from '@/features/billing/credit-debit-cards/types'
import CreditCardListing from './credit-card-listing'

const CreditCardContent = ({
  selectedCreditCard,
  creditCards,
  setCreditCardOpenStateValue,
}: {
  selectedCreditCard?: CreditCard
  creditCards: CreditCard[]
  setCreditCardOpenStateValue: (value: string) => void
}) => {
  const trigger = <TriggerButton title="Add New Credit/Debit Card" />

  if (!selectedCreditCard) {
    return (
      <Flex direction="column" align="center">
        <FeatureEmpty
          description="No Credit/Debit card added yet"
          Icon={EmptyFileIcon}
        />
        <Flex mt="-7">
          <Box
            className="w-full"
            onClick={() => setCreditCardOpenStateValue('Add New Card')}
          >
            {trigger}
          </Box>
        </Flex>
      </Flex>
    )
  }

  return <CreditCardListing creditCards={creditCards} />
}

export default CreditCardContent
