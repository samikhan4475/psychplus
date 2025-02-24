'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  TextInput,
} from '@/components'

const SourceNameInput = ({ disabled }: { disabled: boolean }) => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>Source Name</FormFieldLabel>
      <TextInput
        field="sourceName"
        className="h-6 w-full"
        disabled={disabled}
        placeHolder="Enter source name"
      />
      <FormFieldError name="sourceName" />
    </FormFieldContainer>
  )
}

export { SourceNameInput }
