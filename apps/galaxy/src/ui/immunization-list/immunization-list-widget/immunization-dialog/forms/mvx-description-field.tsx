'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { AdministeredSchemaType } from './schema'

const MvxDescriptionField = () => {
  const form = useFormContext<AdministeredSchemaType>()
  return (
    <FormFieldContainer>
      <FormFieldLabel>MVX Description</FormFieldLabel>
      <TextField.Root
        {...form.register('mvxDescription')}
        className="h-6 w-[250px]"
        size="1"
      />
      <FormFieldError name="mvxDescription" />
    </FormFieldContainer>
  )
}

export { MvxDescriptionField }
