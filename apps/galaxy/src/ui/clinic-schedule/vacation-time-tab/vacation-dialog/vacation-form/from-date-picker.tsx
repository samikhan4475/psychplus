'use client'

import { Flex } from '@radix-ui/themes'
import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { TimeSelect } from '../../shared'

const FromDatePicker = () => {
  return (
    <FormFieldContainer className="col-span-2">
      <FormFieldLabel>From Date & Time</FormFieldLabel>
      <Flex gap="2">
        <DatePickerInput
          field="startDateTime"
          granularity="day"
          className="flex-1"
        />
        <TimeSelect field="fromTime" />
      </Flex>
    </FormFieldContainer>
  )
}

export { FromDatePicker }
