'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { InsuranceSchemaType } from './schema'

const LastNameInput = () => {
  const form = useFormContext<InsuranceSchemaType>()

  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1" required>
        Last Name
      </FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Enter last name"
        {...form.register('policyHolderLastName')}
        className="border-pp-gray-2 h-7 w-full border border-solid !outline-none [box-shadow:none]"
      />
      <FormFieldError name="policyHolderLastName" />
    </FormFieldContainer>
  )
}

export { LastNameInput }
