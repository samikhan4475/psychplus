'use client'

import { Button, Flex, Text } from '@radix-ui/themes'
import { EligibilityInfo } from './eligibility-info'
import { EligibilityStatus } from './eligibility-status'

const EligibilityHeader = () => {
  return (
    <Flex
      align="center"
      justify="between"
      className="rounded-1 bg-indigo-3 px-1 py-1"
    >
      <Flex gap="2" align="center">
        <Text size="1" weight="medium">
          Last Checked on 12/02/2022 00:00:00
        </Text>
        <EligibilityStatus />
        <EligibilityInfo />
      </Flex>
      <Button
        size="1"
        color="gray"
        className="text-pp-black-1 bg-transparent  font-medium"
      >
        View Report
      </Button>
    </Flex>
  )
}

export { EligibilityHeader }
