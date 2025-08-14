'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { AdministeredSchemaType } from './schema'

const ManufactureCodeField = () => {
  const form = useFormContext<AdministeredSchemaType>()
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Manufacture Code</FormFieldLabel>
      <TextField.Root
        {...form.register('mvxCode')}
        className="h-6"
        readOnly={true}
        size="1"
      />
      <FormFieldError name="mvxCode" />
    </FormFieldContainer>
  )
}

export { ManufactureCodeField }
