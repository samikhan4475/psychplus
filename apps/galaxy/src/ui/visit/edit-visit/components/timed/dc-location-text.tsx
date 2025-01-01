'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext, useWatch } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { SchemaType } from '../../schema'

const DCLocationText = () => {
  const form = useFormContext<SchemaType>()
  const visitType = useWatch({
    control: form.control,
    name: 'visitType',
  })
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>DC Location</FormFieldLabel>
      <TextField.Root
        size="1"
        {...form.register('dcLocation')}
        placeholder="Enter DC Location"
        disabled={!visitType}
      />
      <FormFieldError name="dcLocation" />
    </FormFieldContainer>
  )
}

export { DCLocationText }
