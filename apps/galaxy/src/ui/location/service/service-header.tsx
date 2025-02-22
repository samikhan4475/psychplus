'use client'

import React from 'react'
import { Flex, Text } from '@radix-ui/themes'

const ServiceHeader = () => {
  return (
    <Flex align="center" className="bg-white items-start gap-2 p-2 shadow-2">
      <Text size="3" weight="bold">
        Services
      </Text>
    </Flex>
  )
}

export { ServiceHeader }
