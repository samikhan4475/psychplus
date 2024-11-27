import React from 'react'
import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

const GenderSelect = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Gender</FormFieldLabel>
      <CodesetSelect size="1" codeset={CODESETS.Gender} name="gender" />
      <FormFieldError name="gender" />
    </FormFieldContainer>
  )
}

export { GenderSelect }
