'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext, useWatch } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { SchemaType } from '../../schema'

const AuthNumberInput = () => {
  const form = useFormContext<SchemaType>()
  const legal = useWatch({
    control: form.control,
    name: 'legal',
  })

  return (
    <FormFieldContainer className="flex-1 gap-[3px]">
      <FormFieldLabel>Ins. Authorization #</FormFieldLabel>
      <TextField.Root
        size="1"
        {...form.register('insuranceAuthorizationNumber')}
        placeholder="Enter Auth Number"
        disabled={!legal}
        className="h-6 w-full"
      />
      <FormFieldError name="insuranceAuthorizationNumber" />
    </FormFieldContainer>
  )
}

export { AuthNumberInput }
