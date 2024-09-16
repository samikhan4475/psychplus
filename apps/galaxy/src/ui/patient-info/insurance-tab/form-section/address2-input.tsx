'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { InsuranceSchemaType } from './schema'

const Address2Input = () => {
  const form = useFormContext<InsuranceSchemaType>()

  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1">Address 2</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Enter address 2"
        {...form.register('policyHolderAddress2')}
        className="border-pp-gray-2 h-7 w-full border border-solid !outline-none [box-shadow:none]"
      />
      <FormFieldError name="policyHolderAddress2" />
    </FormFieldContainer>
  )
}

export { Address2Input }
