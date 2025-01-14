'use client'

import { Flex } from '@radix-ui/themes'
import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { FromTimeInput } from './form-time-input'

const FromDatePicker = () => {
  return (
    <FormFieldContainer className="col-span-2">
      <FormFieldLabel>From Date & Time</FormFieldLabel>
      <Flex gap="2">
        <DatePickerInput field="fromDate" className="flex-1" />
        <FromTimeInput />
      </Flex>
    </FormFieldContainer>
  )
}

export { FromDatePicker }
