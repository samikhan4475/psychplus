'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { EditUserSchemaType } from '../edit-user-schema'

interface PPUserIDInputProps {
  disabled?: boolean
}

const PPUserIDInput = ({ disabled }: PPUserIDInputProps) => {
  const form = useFormContext<EditUserSchemaType>()
  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel required>
        PP User ID
      </FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Enter PP User ID"
        disabled={disabled}
        {...form.register('ppUserId')}
      />
      <FormFieldError name="ppUserId" />
    </FormFieldContainer>
  )
}

export { PPUserIDInput }
