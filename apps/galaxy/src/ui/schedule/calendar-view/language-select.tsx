import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const LanguageSelect = () => {
  return (
    <FormFieldContainer>
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
