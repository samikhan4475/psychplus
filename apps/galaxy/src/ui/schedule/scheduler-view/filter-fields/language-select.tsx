'use client'

import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { FormFieldContainer } from '../../shared/form-field-container'

const LanguageSelect = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Language</FormFieldLabel>
      <CodesetSelect
        name="language"
        codeset={CODESETS.Language}
        size="1"
        className="flex-1"
      />
    </FormFieldContainer>
  )
}

export { LanguageSelect }
