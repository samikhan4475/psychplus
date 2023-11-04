'use client'

import { Flex, Text } from '@radix-ui/themes'

const RootError = () => (
  <Flex align="center" justify="center" height="100%" width="100%">
    <Text size="2" className="italic text-gray-9">
      Something went wrong!
    </Text>
  </Flex>
)

export { RootError }
