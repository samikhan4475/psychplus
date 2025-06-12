import React from 'react'
import {
  AutoResizeInput,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'

const BioField = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>Bio Text</FormFieldLabel>
      <AutoResizeInput
        field="biography"
        maxLength={2048}
        enableAutoSuggestions={false}
        className="min-h-20 w-[-webkit-fill-available]"
      />
      <FormFieldError name="biography" />
    </FormFieldContainer>
  )
}

export { BioField }
