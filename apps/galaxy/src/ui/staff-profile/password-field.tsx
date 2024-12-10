import React from 'react'
import { TextField } from '@radix-ui/themes'
import { FormFieldContainer, FormFieldLabel } from '@/components'

const PasswordField = () => {
  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel>Password</FormFieldLabel>
      <TextField.Root
        size="1"
        disabled
        className="border-pp-gray-2 w-full border border-solid !outline-none [box-shadow:none] "
      />
    </FormFieldContainer>
  )
}

export { PasswordField }
