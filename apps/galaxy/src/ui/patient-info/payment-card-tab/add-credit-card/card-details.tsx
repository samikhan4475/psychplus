'use client'

import { PropsWithChildren } from 'react'
import { Box, Flex, Heading } from '@radix-ui/themes'
import { CardNameField } from './card-name-field'

const CardDetails = ({ children }: PropsWithChildren) => {
  return (
    <Flex
      direction="column"
      width="100%"
      className="bg-white overflow-hidden rounded-1 border border-gray-3"
    >
      <Box className="w-full bg-indigo-3 px-2 py-0.5">
        <Heading size="2">Credit & Debit Cards Details</Heading>
      </Box>
      <Flex align="start" p="2" gap="2">
        <CardNameField />
        {children}
      </Flex>
    </Flex>
  )
}
export { CardDetails }
