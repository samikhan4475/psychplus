'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { EditUserSchemaType } from '../edit-user-schema'

interface SSNInputProps {
  disabled?: boolean
}

const SSNInput = ({ disabled = false }: SSNInputProps) => {
  const form = useFormContext<EditUserSchemaType>()
  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel>
        SSN
      </FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Enter SSN"
        disabled={disabled}
        {...form.register('ssn')}
      />
      <FormFieldError name="ssn" />
    </FormFieldContainer>
  )
}

export { SSNInput }
