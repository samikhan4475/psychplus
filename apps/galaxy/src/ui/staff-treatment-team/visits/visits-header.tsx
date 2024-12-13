'use client'

import { PropsWithChildren } from 'react'
import { Flex, Text } from '@radix-ui/themes'

const VisitHeader = ({ children }: PropsWithChildren) => {
  return (
    <Flex direction="column" gap="1" className="bg-pp-bg-accent">
      <Flex className="bg-white" p="2">
        <Text size="4" weight="medium">
          Visits
        </Text>
      </Flex>
      {children}
    </Flex>
  )
}

export { VisitHeader }
