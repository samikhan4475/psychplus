'use client'

import { Checkbox, Flex, Text } from '@radix-ui/themes'

const MonthlyPaymentCheckBox = () => {
  return (
    <Text as="label" size="1" className="font-[510]">
      <Flex as="span" gap="2">
        <Checkbox
          size="1"
          className="data-[state=checked]:before:bg-pp-text-primary-base"
        />
        Start Monthly Payment plan
      </Flex>
    </Text>
  )
}

export { MonthlyPaymentCheckBox }
