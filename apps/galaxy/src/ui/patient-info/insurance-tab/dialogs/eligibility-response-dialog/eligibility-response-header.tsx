'use client'

import { Flex, Text } from '@radix-ui/themes'
import { EligibilityResponseInfo } from './eligibility-response-info'

const EligibilityResponseHeader = () => {
  return (
    <Flex direction="column" className="gap-1.5">
      <Flex gap="1" align="center">
        <Text size="1" weight="bold">
          Medicare Advantage Plan
        </Text>
        <Text size="1" weight="medium">
          Last Checked on 12/02/2022 00:00:00, by Dr David Warner Messy
        </Text>
      </Flex>
      <EligibilityResponseInfo />
    </Flex>
  )
}

export { EligibilityResponseHeader }
