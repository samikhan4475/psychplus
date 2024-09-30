'use client'

import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

const PolicyTypeSelect = () => {
  return (
    <FormFieldContainer className="w-auto flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">Policy Type</FormFieldLabel>
      <CodesetSelect
        name="type"
        placeholder="Select"
        codeset={CODESETS.PatientConsentPolicyType}
        className="w-[144px]"
        size="1"
      />
      <FormFieldError name="type" />
    </FormFieldContainer>
  )
}

export { PolicyTypeSelect }
