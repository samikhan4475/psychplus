'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { EditUserSchemaType } from '../edit-user-schema'

interface DOBInputProps {
  disabled?: boolean
}

const DOBInput = ({ disabled = false }: DOBInputProps) => {
  const form = useFormContext<EditUserSchemaType>()
  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel required>
        DOB
      </FormFieldLabel>
      <TextField.Root
        size="1"
        type="date"
        placeholder="MM/DD/YYYY"
        disabled={disabled}
        {...form.register('dob')}
      />
      <FormFieldError name="dob" />
    </FormFieldContainer>
  )
}

export { DOBInput }
