import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { DatePickerInput } from '@/components'

const FromDateFilter = () => {
  return (
    <Flex width="100%" gap="1" align="center">
      <Text size="1" weight="medium">
        From
      </Text>
      <DatePickerInput field="startDate" />
    </Flex>
  )
}

export { FromDateFilter }
