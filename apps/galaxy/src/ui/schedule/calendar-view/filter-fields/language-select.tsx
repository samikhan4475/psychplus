import { DropdownSelect } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { FieldLabel, FormFieldContainer } from '../../shared'

const LanguageSelect = () => {
  const options = useCodesetOptions(CODESETS.Language)
  return (
    <FormFieldContainer>
      <FieldLabel>Language</FieldLabel>
      <DropdownSelect field="providerLanguage" options={options} shouldDirty />
    </FormFieldContainer>
  )
}

export { LanguageSelect }
