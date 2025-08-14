'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { AdministeredSchemaType } from './schema'

const DoseField = () => {
  const form = useFormContext<AdministeredSchemaType>()
  return (
    <FormFieldContainer>
      <FormFieldLabel>Dose</FormFieldLabel>
      <TextField.Root {...form.register('dose')} className="h-6" size="1" />
      <FormFieldError name="dose" />
    </FormFieldContainer>
  )
}

export { DoseField }
