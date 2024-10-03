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
        size="1"
        {...form.register('policyHolderDateOfBirth')}
        className="border-pp-gray-2 h-7 w-full border border-solid !outline-none [box-shadow:none] [&__.rt-TextFieldInput]:!inline-block"
      />
      <FormFieldError name="policyHolderDateOfBirth" />
    </FormFieldContainer>
  )
}

export { DOBDatePicker }
