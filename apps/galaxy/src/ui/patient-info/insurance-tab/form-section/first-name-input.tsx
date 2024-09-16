'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { InsuranceSchemaType } from './schema'

const FirstNameInput = () => {
  const form = useFormContext<InsuranceSchemaType>()
  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1" required>
        First Name
      </FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Enter first name"
        {...form.register('policyHolderFirstName')}
        className="border-pp-gray-2 h-7 w-full border border-solid !outline-none [box-shadow:none]"
      />
      <FormFieldError name="policyHolderFirstName" />
    </FormFieldContainer>
  )
}

export { FirstNameInput }
