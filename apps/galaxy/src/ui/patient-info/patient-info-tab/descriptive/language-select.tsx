import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const LanguageSelect = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Language</FormFieldLabel>
      <CodesetSelect name="language" codeset={CODESETS.Language} size="1" />
    </FormFieldContainer>
  )
}

export { LanguageSelect }
