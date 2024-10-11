import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

const ProficiencySelect = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className="!text-1">Proficiency</FormFieldLabel>
      <CodesetSelect
        name="languageProficiency"
        codeset={CODESETS.LanguageProficiency}
        size="1"
      />
      <FormFieldError name="languageProficiency" />
    </FormFieldContainer>
  )
}

export { ProficiencySelect }
