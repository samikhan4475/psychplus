import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { DatePickerInput } from '@/components'

const FromDateFilter = () => {
  return (
    <Flex width="100%" gap="1" align="center">
      <Text size="1" weight="medium">
        Date
      </Text>
      <DatePickerInput
        className="w-[248px]"
        field="from"
        aria-label="date-to-filter-input"
      />
    </Flex>
  )
}

export { FromDateFilter }
