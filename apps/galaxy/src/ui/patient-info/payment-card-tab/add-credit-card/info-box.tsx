'use client'

import { Box, Flex, Text } from '@radix-ui/themes'
import { CreditDebitCardsIcon } from '@/components/icons'

const InfoBox = () => {
  return (
    <Box width="100%" maxWidth={'776px'}>
      <Flex
        gap="2"
        justify="between"
        align="center"
        mb="2"
        className="rounded-1 border border-grayA-2 px-2.5 py-0.5"
      >
        <Text size="1" className="text-black/80">
          We accept all major Credit & Debit Cards
        </Text>
        <CreditDebitCardsIcon />
      </Flex>
    </Box>
  )
}

export { InfoBox }
