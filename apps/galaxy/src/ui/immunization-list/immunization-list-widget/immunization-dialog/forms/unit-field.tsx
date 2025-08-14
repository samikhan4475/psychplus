'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { AdministeredSchemaType } from './schema'

const UnitField = () => {
  const form = useFormContext<AdministeredSchemaType>()
  return (
    <FormFieldContainer>
      <FormFieldLabel>Unit</FormFieldLabel>
      <TextField.Root {...form.register('units')} className="h-6" size="1" />
      <FormFieldError name="units" />
    </FormFieldContainer>
  )
}

export { UnitField }
