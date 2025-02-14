'use client'

import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

const GenderSelect = () => {
  return (
    <FormFieldContainer className="flex w-full">
      <FormFieldLabel required>Gender</FormFieldLabel>
      <CodesetSelect
        name="gender"
        codeset={CODESETS.Gender}
        className="text-1"
      />
      <FormFieldError name="gender" />
    </FormFieldContainer>
  )
}

export { GenderSelect }
