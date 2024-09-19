'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { SchemaType } from '../../schema'

const AuthDateInput = () => {
  const form = useFormContext<SchemaType>()
  const legal = form.watch('legal')

  return (
    <FormFieldContainer className="flex-1 gap-[3px]">
      <FormFieldLabel required>Auth Date</FormFieldLabel>
      <TextField.Root
        size="1"
        {...form.register('authDate')}
        placeholder="Enter Auth Date"
        disabled={!legal}
        className='h-[21px]'
      />
      <FormFieldError name="authDate" />
    </FormFieldContainer>
  )
}

export { AuthDateInput }
