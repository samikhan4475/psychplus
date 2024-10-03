'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { SchemaType } from '../../schema'

const AuthNumberText = () => {
  const form = useFormContext<SchemaType>()
  return (
    <FormFieldContainer className="flex-1 gap-[3px]">
      <FormFieldLabel>Auth #</FormFieldLabel>
      <TextField.Root
        {...form.register('authNumber')}
        placeholder="Enter Auth Number"
        className="h-[21px]"
        size="1"
      />
      <FormFieldError name="authNumber" />
    </FormFieldContainer>
  )
}

export { AuthNumberText }
