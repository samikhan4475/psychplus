'use client'

import { Flex, Heading } from '@radix-ui/themes'

const IntReferralsHeader = () => {
  return (
    <Flex py="2" px="4" className="bg-white z-[1]" position="sticky" top="0">
      <Heading size="5">INT referrals</Heading>
    </Flex>
  )
}

export { IntReferralsHeader }
