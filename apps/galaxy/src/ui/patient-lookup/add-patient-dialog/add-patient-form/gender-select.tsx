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
    <FormFieldContainer className="gap-1">
      <FormFieldLabel className="!text-1" required>
        Gender
      </FormFieldLabel>
      <CodesetSelect
        codeset={CODESETS.Gender}
        size="1"
        name="gender"
        className="min-h-6 flex-1"
      />
      <FormFieldError name="gender" />
    </FormFieldContainer>
  )
}

export { GenderSelect }
