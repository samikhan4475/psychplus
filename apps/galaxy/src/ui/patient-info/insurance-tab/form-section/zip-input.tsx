'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { InsuranceSchemaType } from './schema'

const ZipInput = () => {
  const form = useFormContext<InsuranceSchemaType>()

  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1" required>
        Zip
      </FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Enter zip"
        {...form.register('policyHolderPostalCode')}
        className="border-pp-gray-2 h-7 w-full border border-solid !outline-none [box-shadow:none]"
      />
      <FormFieldError name="policyHolderPostalCode" />
    </FormFieldContainer>
  )
}

export { ZipInput }
