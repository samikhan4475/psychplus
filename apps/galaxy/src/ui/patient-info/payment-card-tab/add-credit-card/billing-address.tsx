'use client'

import { Box, Flex, Heading } from '@radix-ui/themes'
import { AddressFieldsGroup } from '@/components'

const BillingAddress = () => {
  return (
    <Flex
      direction="column"
      width="100%"
      className="bg-white rounded-1 border border-gray-3"
    >
      <Box className="w-full bg-indigo-3 px-2 py-0.5">
        <Heading size="2">Billing Address</Heading>
      </Box>
      <AddressFieldsGroup className="flex-row p-2" columnsPerRow="2" />
    </Flex>
  )
}
export { BillingAddress }
