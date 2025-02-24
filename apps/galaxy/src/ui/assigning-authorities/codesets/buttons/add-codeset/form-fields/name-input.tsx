'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  TextInput,
} from '@/components'

const NameInput = ({ disabled }: { disabled: boolean }) => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>Name</FormFieldLabel>
      <TextInput
        field="name"
        className="h-6 w-full"
        disabled={disabled}
        placeHolder="Enter name"
      />
      <FormFieldError name="name" />
    </FormFieldContainer>
  )
}

export { NameInput }
