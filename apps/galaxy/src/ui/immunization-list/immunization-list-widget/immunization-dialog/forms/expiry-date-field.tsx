'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { AdministeredSchemaType } from './schema'

const ExpiryDField = () => {
  const form = useFormContext<AdministeredSchemaType>()

  return (
    <FormFieldContainer className="">
      <FormFieldLabel required>Expiry Date</FormFieldLabel>
      <TextField.Root
        type="date"
        size="1"
        {...form.register('expirationDate')}
        className="border-pp-gray-2 h-6   border border-solid !outline-none [box-shadow:none] [&__.rt-TextFieldInput]:!inline-block"
      />
    </FormFieldContainer>
  )
}

export { ExpiryDField }
