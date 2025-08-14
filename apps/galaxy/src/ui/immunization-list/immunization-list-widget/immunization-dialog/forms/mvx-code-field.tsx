'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { AdministeredSchemaType } from './schema'

const MvxCodeField = () => {
  const form = useFormContext<AdministeredSchemaType>()
  return (
    <FormFieldContainer>
      <FormFieldLabel required>MVX Code</FormFieldLabel>
      <TextField.Root
        {...form.register('mvxCode')}
        className="h-6 w-[155px]"
        size="1"
      />
      <FormFieldError name="mvxCode" />
    </FormFieldContainer>
  )
}

export { MvxCodeField }
