import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { DatePickerInput } from '@/components'
import { SchemaType } from '../schema'

const FromDateFilter = () => {
  const form = useFormContext<SchemaType>()
  return (
    <Flex width="100%" gap="1" align="center">
      <Text size="1" weight="medium">
        Date
      </Text>
      <DatePickerInput
        className="w-[248px]"
        field="from"
        aria-label="date-from-filter-input"
        granularity="day"
        dateInputClass="h-6"
        maxValue={form.watch('to') ?? undefined}
      />
    </Flex>
  )
}

export { FromDateFilter }
