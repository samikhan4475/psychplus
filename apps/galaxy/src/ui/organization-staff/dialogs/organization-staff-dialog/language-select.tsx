'use client'

import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

const LanguageSelect = () => {
  return (
    <FormFieldContainer className="flex w-full">
      <FormFieldLabel required>Language</FormFieldLabel>
      <CodesetSelect
        name="language"
        codeset={CODESETS.ClaimFiltrationDateType}
      />
      <FormFieldError name="language" />
    </FormFieldContainer>
  )
}

export { LanguageSelect }
