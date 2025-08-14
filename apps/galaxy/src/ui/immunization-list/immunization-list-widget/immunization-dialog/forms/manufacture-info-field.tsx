'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { AdministeredSchemaType } from './schema'

const ManufactureInfoField = () => {
  const form = useFormContext<AdministeredSchemaType>()
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Manufacture Info</FormFieldLabel>
      <TextField.Root
        {...form.register('manufacturInformation')}
        className="h-6"
        size="1"
      />
      <FormFieldError name="manufacturInformation" />
    </FormFieldContainer>
  )
}

export { ManufactureInfoField }
