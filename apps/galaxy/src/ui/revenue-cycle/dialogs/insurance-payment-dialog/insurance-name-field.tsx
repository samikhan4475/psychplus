'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { SchemaType } from './insurance-payment-form'

const InsuranceNameField = () => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel>Insurance Name</FormFieldLabel>
      <TextField.Root
        size="1"
        {...form.register('insuranceName')}
        placeholder="John Doe"
      />
      <FormFieldError name="insuranceName" />
    </FormFieldContainer>
  )
}

export { InsuranceNameField }
