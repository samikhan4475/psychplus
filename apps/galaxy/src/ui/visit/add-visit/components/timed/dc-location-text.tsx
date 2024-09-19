'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { SchemaType } from '../../schema'

const DCLocationInput = () => {
  const form = useFormContext<SchemaType>()
  const visitType = form.watch('visitType')

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>DC Hospital Name</FormFieldLabel>
      <TextField.Root
        size="1"
        {...form.register('dcHospitalName')}
        placeholder="Enter DC Hospital Name"
        disabled={!visitType}
      />
      <FormFieldError name="dcHospitalName" />
    </FormFieldContainer>
  )
}

export { DCLocationInput }
