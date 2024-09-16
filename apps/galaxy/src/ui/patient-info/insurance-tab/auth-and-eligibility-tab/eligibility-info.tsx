'use client'

import { Flex, Text } from '@radix-ui/themes'

const EligibilityInfo = () => {
  return (
    <>
      <Flex gap="1" align="center">
        <Text size="1">Copay</Text>
        <Text size="2" weight="bold">
          $25%
        </Text>
      </Flex>
      <Flex gap="1" align="center">
        <Text size="1">Coinsurance</Text>
        <Text size="2" weight="bold">
          $20%
        </Text>
      </Flex>
      <Flex gap="1" align="center">
        <Text size="1">Deductible</Text>
        <Text size="2" weight="bold">
          $20%
        </Text>
      </Flex>
      <Flex gap="1" align="center">
        <Text size="1">Effective</Text>
        <Text size="2" weight="bold">
          $20%
        </Text>
      </Flex>
    </>
  )
}

export { EligibilityInfo }
