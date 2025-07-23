'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { EditUserSchemaType } from '../edit-user-schema'

interface UsersInIDInputProps {
  disabled?: boolean
}

const UsersInIDInput = ({ disabled = false }: UsersInIDInputProps) => {
  const form = useFormContext<EditUserSchemaType>()
  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel>
        Users in ID
      </FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Users in ID"
        disabled={disabled}
        {...form.register('usersInId')}
      />
      <FormFieldError name="usersInId" />
    </FormFieldContainer>
  )
}

export { UsersInIDInput }
