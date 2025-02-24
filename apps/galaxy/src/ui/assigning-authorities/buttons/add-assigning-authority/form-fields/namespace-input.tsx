'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  TextInput,
} from '@/components'

const NamespaceInput = ({ disabled }: { disabled: boolean }) => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>Namespace</FormFieldLabel>
      <TextInput
        field="namespace"
        className="h-6 w-full"
        disabled={disabled}
        placeHolder="Enter namespace"
      />
      <FormFieldError name="namespace" />
    </FormFieldContainer>
  )
}

export { NamespaceInput }
