import React, { useEffect } from 'react'
import { fromDate } from '@internationalized/date'
import { Box } from '@radix-ui/themes'
import { addDays } from 'date-fns'
import { useFormContext } from 'react-hook-form'
import {
  DatePickerInput,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'

const RequestedDateField = () => {
  const form = useFormContext()
  const maxValue = fromDate(
    addDays(new Date(), 90),
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  )

  useEffect(() => {
    if (form.formState.isSubmitted) form.trigger()
  }, [form.watch('fromDate'), form.watch('toDate')])

  return (
    <FormFieldContainer className="flex-col gap-1">
      <FormFieldLabel required>Requested Date</FormFieldLabel>
      <Box className="flex gap-1">
        <Box className="flex gap-1">
          <FormFieldLabel>From</FormFieldLabel>
          <DatePickerInput
            field="fromDate"
            className="w-[101px]"
            maxValue={maxValue}
            isDisabled={!form.watch('serviceOffered')}
          />
        </Box>
        <Box className="flex gap-1">
          <FormFieldLabel>To</FormFieldLabel>
          <DatePickerInput
            field="toDate"
            className="w-[101px]"
            minValue={form.watch('fromDate')}
            maxValue={maxValue}
            isDisabled={!form.watch('serviceOffered')}
          />
        </Box>
      </Box>
    </FormFieldContainer>
  )
}

export { RequestedDateField }
