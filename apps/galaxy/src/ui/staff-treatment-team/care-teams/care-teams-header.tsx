'use client'

import { PropsWithChildren } from 'react'
import { Flex, Text } from '@radix-ui/themes'

const CareTeamsHeader = ({ children }: PropsWithChildren) => {
  return (
    <Flex direction="column" gap="1" className="bg-white" p="2">
      <Text size="4" weight="medium">
        Care Teams
      </Text>
      {children}
    </Flex>
  )
}

export { CareTeamsHeader }
