'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  TextInput,
} from '@/components'

const DescriptionInput = ({ disabled }: { disabled: boolean }) => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>Description</FormFieldLabel>
      <TextInput
        field="description"
        className="h-6 w-full"
        disabled={disabled}
        placeHolder="Enter description"
      />
      <FormFieldError name="description" />
    </FormFieldContainer>
  )
}

export { DescriptionInput }
