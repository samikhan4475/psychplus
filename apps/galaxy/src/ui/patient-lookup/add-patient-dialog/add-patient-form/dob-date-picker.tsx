'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { getCalendarDate, getCalendarDateLabel } from '@/utils'
import { AddPatientSchemaType } from './schema'

const DOBDatePicker = () => {
  const form = useFormContext<AddPatientSchemaType>()
  const today = getCalendarDate()
  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1" required>
        DOB
      </FormFieldLabel>
      <TextField.Root
        type="date"
        size="1"
        min={getCalendarDateLabel(today.subtract({ years: 120 }))}
        max={getCalendarDateLabel(today.subtract({ years: 18 }))}
        data-testid="dateOfBirth"
        {...form.register('dateOfBirth')}
      />
      <FormFieldError name="dateOfBirth" />
    </FormFieldContainer>
  )
}

export { DOBDatePicker }
