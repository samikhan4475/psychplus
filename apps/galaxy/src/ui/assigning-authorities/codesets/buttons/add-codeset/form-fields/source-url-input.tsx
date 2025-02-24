'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  TextInput,
} from '@/components'

const SourceUrlInput = ({ disabled }: { disabled: boolean }) => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>Source URL</FormFieldLabel>
      <TextInput
        field="sourceUrl"
        className="h-6 w-full"
        disabled={disabled}
        placeHolder="Enter source url"
      />
      <FormFieldError name="sourceUrl" />
    </FormFieldContainer>
  )
}

export { SourceUrlInput }
