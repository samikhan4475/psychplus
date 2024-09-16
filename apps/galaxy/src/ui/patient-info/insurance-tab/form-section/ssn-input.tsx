'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { InsuranceSchemaType } from './schema'

const SSNInput = () => {
  const form = useFormContext<InsuranceSchemaType>()
  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1">SSN</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Enter SSN"
        {...form.register('policyHolderSocialSecurityNumber')}
        className="border-pp-gray-2 h-7 w-full border border-solid !outline-none [box-shadow:none]"
      />
    </FormFieldContainer>
  )
}

export { SSNInput }
