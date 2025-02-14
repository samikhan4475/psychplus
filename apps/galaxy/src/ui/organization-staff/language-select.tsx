'use client'

import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const LanguageSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Language</FormFieldLabel>
      <CodesetSelect
        name="spokenLanguage"
        codeset={CODESETS.Language}
        size="1"
        className="w-[calc(100%-65px)]"
      />
    </FormFieldContainer>
  )
}

export { LanguageSelect }
