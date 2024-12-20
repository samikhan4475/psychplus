'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { getCalendarDate, getCalendarDateLabel } from '@/utils'
import { PatientInfoSchemaType } from '../patient-info-schema'

const DobInput = () => {
  const form = useFormContext<PatientInfoSchemaType>()
  const today = getCalendarDate()
  return (
    <FormFieldContainer>
      <FormFieldLabel className="!text-1" required>
        Date of Birth
      </FormFieldLabel>
      <TextField.Root
        type="date"
        max={getCalendarDateLabel(today)}
        data-testid="dob-input"
        size="1"
        {...form.register('birthdate')}
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none] [&__.rt-TextFieldInput]:!inline-block"
      />

      <FormFieldError name="birthdate" />
    </FormFieldContainer>
  )
}

export { DobInput }
