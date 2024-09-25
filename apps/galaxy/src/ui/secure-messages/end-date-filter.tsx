import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { DatePickerInput } from '@/components'

const EndDate = () => {
  return (
    <Flex width="100%" className="gap-[6px]" align="center">
      <Text size="4" weight="medium">
        -
      </Text>
      <DatePickerInput
        className="w-[248px] "
        field="endDate"
        aria-label="date-to-filter-input"
      />
    </Flex>
  )
}

export { EndDate }
