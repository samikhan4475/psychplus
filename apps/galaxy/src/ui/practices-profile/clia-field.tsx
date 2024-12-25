import React from 'react'
import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { ProfileSchemaType } from './profile-form'

const CLIAField = () => {
  const form = useFormContext<ProfileSchemaType>()
  return (
    <FormFieldContainer>
      <FormFieldLabel className="!text-1">CLIA</FormFieldLabel>
      <TextField.Root
        size="1"
        className="border-pp-gray-2 w-full border border-solid !outline-none [box-shadow:none] "
        {...form.register('clia')}
        placeholder="CLIA"
      />
      <FormFieldError name="clia" />
    </FormFieldContainer>
  )
}

export { CLIAField }
