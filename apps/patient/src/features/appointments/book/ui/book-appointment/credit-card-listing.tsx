'use client'

import { Box, Flex } from '@radix-ui/themes'
import { CreditCard } from '@/features/billing/credit-debit-cards/types'
import { CreditCardListItem } from '@/features/billing/credit-debit-cards/ui/credit-debit-cards-card/credit-debit-card-list-item'

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

export default CreditCardListing
