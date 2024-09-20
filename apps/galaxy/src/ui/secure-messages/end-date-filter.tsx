import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { DatePickerInput } from '@/components'

const EndDate = () => {
  return (
    <Flex width="100%" gap="1" align="center">
      <Text size="1" weight="medium">
        -
      </Text>
      <DatePickerInput field="startDate" />
    </Flex>
  )
}

export { EndDate }
