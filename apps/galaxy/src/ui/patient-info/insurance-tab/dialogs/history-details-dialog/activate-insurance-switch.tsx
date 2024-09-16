'use client'

import { Flex, Switch, Text } from '@radix-ui/themes'

const ActivateInsuranceSwitch = () => {
  return (
    <Flex gap="1" className="col-span-3" align="center">
      <Text size="1" weight="medium">
        Activate insurance
      </Text>
      <Text as="label" size="1" weight="medium">
        <Flex className="gap-1.5">
          <Switch size="1" color="green" />
          Yes
        </Flex>
      </Text>
    </Flex>
  )
}

export { ActivateInsuranceSwitch }
