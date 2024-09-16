'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { InsuranceSchemaType } from './schema'

const Address1Input = () => {
  const form = useFormContext<InsuranceSchemaType>()

  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1" required>
        Address 1
      </FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Enter address 1"
        {...form.register('policyHolderAddress1')}
        className="border-pp-gray-2 h-7 w-full border border-solid !outline-none [box-shadow:none]"
      />
      <FormFieldError name="policyHolderAddress1" />
    </FormFieldContainer>
  )
}

export { Address1Input }
