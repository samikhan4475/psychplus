'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'

const ProviderInput = () => {
  const form = useFormContext()
  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1" required>
        Provider Name/NPI
      </FormFieldLabel>
      <TextField.Root
        className="border-pp-gray-2 h-7 w-full border border-solid !outline-none [box-shadow:none]"
        {...form.register('providerInput')}
        size="1"
      />
      <FormFieldError name="providerInput" />
    </FormFieldContainer>
  )
}

export { ProviderInput }
