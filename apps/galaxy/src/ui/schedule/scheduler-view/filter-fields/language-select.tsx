'use client'

import { CodesetSelect } from '@/components'
import { CODESETS } from '@/constants'
import { FormFieldContainer } from '../../shared/form-field-container'
import { FieldLabel } from '../../shared'

const LanguageSelect = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FieldLabel>Language</FieldLabel>
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
