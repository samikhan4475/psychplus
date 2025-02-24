'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  TextInput,
} from '@/components'

const DisplayNameInput = ({ disabled }: { disabled: boolean }) => {
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Display Name</FormFieldLabel>
      <TextInput
        field="displayName"
        className="h-6 w-full"
        disabled={disabled}
        placeHolder="Enter display name"
      />
      <FormFieldError name="displayName" />
    </FormFieldContainer>
  )
}

export { DisplayNameInput }
