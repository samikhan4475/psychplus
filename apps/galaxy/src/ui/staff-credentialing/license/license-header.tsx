'use client'

import { PropsWithChildren } from 'react'
import { Flex, Text } from '@radix-ui/themes'

const LicenseHeader = ({ children }: PropsWithChildren) => {
  return (
    <Flex direction="column" gap="1" className="bg-pp-bg-accent">
      <Flex className="bg-white" p="2" align="center">
        <Text size="4" weight="medium" className="w-[120px]">
          License
        </Text>
      </Flex>
      {children}
    </Flex>
  )
}

export { LicenseHeader }
