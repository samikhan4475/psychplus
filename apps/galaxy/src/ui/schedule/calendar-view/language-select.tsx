import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { FormFieldContainer } from '../shared'

const LanguageSelect = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel className="text-[12px]">Language</FormFieldLabel>
      <CodesetSelect
        name="language"
        codeset={CODESETS.CommonLanguages}
        className='flex-1'
        size="1"
      />
    </FormFieldContainer>
  )
}

export { LanguageSelect }
