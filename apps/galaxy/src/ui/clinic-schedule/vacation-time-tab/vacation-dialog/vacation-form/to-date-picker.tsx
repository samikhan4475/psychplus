'use client'

import { Flex } from '@radix-ui/themes'
import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { ToTimeInput } from './to-time-input'

const ToDatePicker = () => {
  return (
    <FormFieldContainer className="col-span-2">
      <FormFieldLabel>To Date & Time</FormFieldLabel>
      <Flex gap="2">
        <DatePickerInput field="toDate" className="flex-1" />
        <ToTimeInput />
      </Flex>
    </FormFieldContainer>
  )
}

export { ToDatePicker }
