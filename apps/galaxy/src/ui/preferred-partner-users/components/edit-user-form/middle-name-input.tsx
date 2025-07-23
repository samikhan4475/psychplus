'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { EditUserSchemaType } from '../edit-user-schema'

interface MiddleNameInputProps {
  disabled?: boolean
}

const MiddleNameInput = ({ disabled = false }: MiddleNameInputProps) => {
  const form = useFormContext<EditUserSchemaType>()
  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel>
        Middle Name
      </FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Enter middle name"
        disabled={disabled}
        {...form.register('middleName')}
      />
      <FormFieldError name="middleName" />
    </FormFieldContainer>
  )
}

export { MiddleNameInput }
