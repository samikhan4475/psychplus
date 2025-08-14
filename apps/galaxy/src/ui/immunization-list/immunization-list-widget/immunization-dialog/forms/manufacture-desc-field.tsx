'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { AdministeredSchemaType } from './schema'

const ManufactureDescField = () => {
  const form = useFormContext<AdministeredSchemaType>()
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Manufacture Desc</FormFieldLabel>
      <TextField.Root
        {...form.register('manufactureDescription')}
        className="h-6"
        readOnly={true}
        size="1"
      />
      <FormFieldError name="manufactureDescription" />
    </FormFieldContainer>
  )
}

export { ManufactureDescField }
