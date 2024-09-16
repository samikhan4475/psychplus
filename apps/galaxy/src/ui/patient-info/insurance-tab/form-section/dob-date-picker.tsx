'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { getCalendarDate, getCalendarDateLabel } from '@/utils'
import { InsuranceSchemaType } from './schema'

const DOBDatePicker = () => {
  const form = useFormContext<InsuranceSchemaType>()
  const today = getCalendarDate()
  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1" required>
        DOB
      </FormFieldLabel>

      <TextField.Root
        type="date"
        min={getCalendarDateLabel(today.subtract({ years: 120 }))}
        max={getCalendarDateLabel(today.subtract({ years: 18 }))}
        data-testid="dob-input"
        {...form.register('policyHolderDateOfBirth')}
        className="h-7 w-full rounded-2 text-1"
      />
      <FormFieldError name="policyHolderDateOfBirth" />
    </FormFieldContainer>
  )
}

export { DOBDatePicker }
