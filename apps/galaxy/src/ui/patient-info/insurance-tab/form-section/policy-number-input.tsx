'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'

const PolicyNumberInput = () => {
  const form = useFormContext()

  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1" required>
        Policy Number
      </FormFieldLabel>
      <TextField.Root
        placeholder="Enter policy number"
        className="border-pp-gray-2 h-7 w-full border border-solid text-1 !outline-none [box-shadow:none]"
        {...form.register('policyNumber')}
      />
      <FormFieldError name="policyNumber" />
    </FormFieldContainer>
  )
}

export { PolicyNumberInput }
