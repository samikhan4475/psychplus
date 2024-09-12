import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { FormFieldContainer } from './form-field-container'

const LanguageSelect = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className="text-[12px]">Language</FormFieldLabel>
      <CodesetSelect
        name="language"
        codeset={CODESETS.CommonLanguages}
        size="1"
      />
    </FormFieldContainer>
  )
}

export { LanguageSelect }
