'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  TextInput,
} from '@/components'

const OidInput = ({ disabled }: { disabled: boolean }) => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>OID</FormFieldLabel>
      <TextInput
        field="oid"
        className="h-6 w-full"
        disabled={disabled}
        placeHolder="Enter OID"
      />
      <FormFieldError name="oid" />
    </FormFieldContainer>
  )
}

export { OidInput }
