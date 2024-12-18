'use client'

import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

const PracticeSelect = () => {
  return (
    <FormFieldContainer className="flex w-full">
      <FormFieldLabel required>Practice</FormFieldLabel>
      <CodesetSelect
        name="practice"
        codeset={CODESETS.ClaimFiltrationDateType}
      />
      <FormFieldError name="practice" />
    </FormFieldContainer>
  )
}

export { PracticeSelect }
