'use client'

import { Flex } from '@radix-ui/themes'
import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { TimeSelect } from '../../shared'

const ToDatePicker = () => {
  return (
    <FormFieldContainer className="col-span-2">
      <FormFieldLabel>To Date & Time</FormFieldLabel>
      <Flex gap="2">
        <DatePickerInput
          field="endDateTime"
          granularity="day"
          className="flex-1"
        />
        <TimeSelect field="toTime" />
      </Flex>
    </FormFieldContainer>
  )
}

export { ToDatePicker }
