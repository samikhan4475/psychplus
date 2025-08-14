'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { AdministeredSchemaType } from './schema'

const LotNumberField = () => {
  const form = useFormContext<AdministeredSchemaType>()
  return (
    <FormFieldContainer>
      <FormFieldLabel>Lot Number</FormFieldLabel>
      <TextField.Root
        {...form.register('lotNumber')}
        className="h-6"
        size="1"
      />
      <FormFieldError name="lotNumber" />
    </FormFieldContainer>
  )
}

export { LotNumberField }
