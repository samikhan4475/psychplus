import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { FormFieldContainer } from '../../shared'

const LanguageSelect = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>Language</FormFieldLabel>
      <CodesetSelect
        name="providerLanguage"
        codeset={CODESETS.Language}
        className='flex-1'
        size="1"
      />
    </FormFieldContainer>
  )
}

export { LanguageSelect }
