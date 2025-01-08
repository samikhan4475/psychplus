'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { LocationFormSchemaType } from './schema'

const IdInput = () => {
  const form = useFormContext<LocationFormSchemaType>()

  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel>ID</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Add ID"
        {...form.register('locationNameGenerated')}
      />
      <FormFieldError name="locationNameGenerated" />
    </FormFieldContainer>
  )
}

export { IdInput }
