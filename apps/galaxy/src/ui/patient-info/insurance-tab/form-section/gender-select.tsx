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
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1" required>
        Gender
      </FormFieldLabel>
      <CodesetSelect
        size="2"
        name="policyHolderGender"
        placeholder="Select gender"
        codeset={CODESETS.Gender}
        className="h-7 w-full text-1"
      />

      <FormFieldError name="policyHolderGender" />
    </FormFieldContainer>
  )
}

export { GenderSelect }
