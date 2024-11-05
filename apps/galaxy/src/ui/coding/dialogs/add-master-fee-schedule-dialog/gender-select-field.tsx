import React from 'react'
import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

const GenderSelectField = () => {
  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel>Gender</FormFieldLabel>
      <CodesetSelect
        name="gender"
        codeset={CODESETS.Gender}
        size="1"
        className="w-full"
      />
      <FormFieldError name="gender" />
    </FormFieldContainer>
  )
}

export { GenderSelectField }
