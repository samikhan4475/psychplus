import { CodesetSelect } from '@/components'
import { CODESETS } from '@/constants'
import { FieldLabel, FormFieldContainer } from '../../shared'

const LanguageSelect = () => {
  return (
    <FormFieldContainer>
      <FieldLabel>Language</FieldLabel>
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
