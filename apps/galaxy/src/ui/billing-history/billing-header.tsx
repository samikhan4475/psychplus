'use client'

import { Flex, Heading } from '@radix-ui/themes'

const BillingHeader = () => {
  return (
    <Flex
      align="center"
      className="bg-white h-8 gap-2 rounded-br-1 rounded-tr-1 px-2"
    >
      <Heading size="3" weight="medium">
        Billing History
      </Heading>
    </Flex>
  )
}

export { BillingHeader }
