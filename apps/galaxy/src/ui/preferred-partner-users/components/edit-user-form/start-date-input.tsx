'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { EditUserSchemaType } from '../edit-user-schema'

interface StartDateInputProps {
  disabled?: boolean
}

const StartDateInput = ({ disabled }: StartDateInputProps) => {
  const form = useFormContext<EditUserSchemaType>()
  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel>
        Start Date
      </FormFieldLabel>
      <TextField.Root
        size="1"
        type="date"
        disabled={disabled}
        {...form.register('startDate')}
      />
      <FormFieldError name="startDate" />
    </FormFieldContainer>
  )
}

export { StartDateInput }
