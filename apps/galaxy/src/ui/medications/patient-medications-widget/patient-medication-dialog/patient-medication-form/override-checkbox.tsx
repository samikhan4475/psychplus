'use client'

import { Flex, Text } from '@radix-ui/themes'
import { CheckboxInput } from '@/components'

const OverRideCheckbox = () => {
  return (
    <Text as="label" size="1" className="text-pp-black-3 font-medium">
      <Flex gap="1" align="center">
        <CheckboxInput field="isRequiresMedicalVisit" size="1" highContrast />
        Override All
      </Flex>
    </Text>
  )
}

export { OverRideCheckbox }
