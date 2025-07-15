import React from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components-v2'
import { DatePickerInput } from '@/components-v2/date-picker-input'
import { getCalendarDateOffsetFromToday } from '@/utils'
import { WaitlistSchemaType } from '../waitlist-form'

const RequestedDateField = () => {
  const form = useFormContext<WaitlistSchemaType>()
  const maxValue = getCalendarDateOffsetFromToday(90)

  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel required>Requested Date</FormFieldLabel>
      <Flex gap="1">
        <FormFieldContainer className="w-full">
          <Flex align="center" className="w-full">
            <FormFieldLabel>From</FormFieldLabel>
            <Box className="w-full">
              <DatePickerInput
                field="fromDate"
                dateInputClass="h-[40px] rounded-6 border-gray-7"
                className="text-[15px]"
                isDisabled={!form.watch('serviceOffered')}
                maxValue={maxValue}
              />
            </Box>
          </Flex>
        </FormFieldContainer>

        <FormFieldContainer className="w-full">
          <Flex align="center" className="w-full">
            <FormFieldLabel>To</FormFieldLabel>
            <Box className="w-full">
              <DatePickerInput
                field="toDate"
                dateInputClass="h-[40px] rounded-6 border-gray-7"
                className="text-[15px]"
                isDisabled={!form.watch('serviceOffered')}
                maxValue={maxValue}
                minValue={form.watch('fromDate')}
              />
            </Box>
          </Flex>
        </FormFieldContainer>
      </Flex>
    </FormFieldContainer>
  )
}

export { RequestedDateField }
