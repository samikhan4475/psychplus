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
      <FormFieldLabel>Ins. Authorization #</FormFieldLabel>
      <TextField.Root
        {...form.register('insuranceAuthorizationNumber')}
        placeholder="Enter Auth Number"
        className="h-6 w-full"
        size="1"
      />
      <FormFieldError name="insuranceAuthorizationNumber" />
    </FormFieldContainer>
  )
}

export { AuthNumberText }
