'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { EditUserSchemaType } from '../edit-user-schema'

interface AddressInputProps {
  disabled?: boolean
}

const AddressInput = ({ disabled = false }: AddressInputProps) => {
  const form = useFormContext<EditUserSchemaType>()
  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel>
        Address
      </FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Enter address"
        disabled={disabled}
        {...form.register('address')}
      />
      <FormFieldError name="address" />
    </FormFieldContainer>
  )
}

export { AddressInput }
