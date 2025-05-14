'use client'

import { Flex, Heading } from '@radix-ui/themes'
import { SmartFilters } from './smart-filters'

const ExternalReferralHeader = () => {
  return (
    <Flex py="2" px="4" className="bg-white z-[1]" position="sticky" top="0">
      <Heading size="5">External Referral</Heading>
      <SmartFilters />
    </Flex>
  )
}

export { ExternalReferralHeader }
