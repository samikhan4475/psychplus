'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { InsuranceSchemaType } from './schema'

const TerminationDatePicker = () => {
  const form = useFormContext<InsuranceSchemaType>()
  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1" required>
        Termination Date
      </FormFieldLabel>
      <TextField.Root
        type="date"
        size="1"
        pattern="\d{4}-\d{2}-\d{2}"
        data-testid="terminationDate-date-input"
        {...form.register('terminationDate')}
        max="3000-01-01"
        className="border-pp-gray-2 h-7 w-full border border-solid !outline-none [box-shadow:none] [&__.rt-TextFieldInput]:!inline-block"
      />
      <FormFieldError name="terminationDate" />
    </FormFieldContainer>
  )
}

export { TerminationDatePicker }
