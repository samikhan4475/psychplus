import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const ProficiencySelect = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className="!text-1">Proficiency</FormFieldLabel>
      <CodesetSelect
        name="language"
        codeset={CODESETS.LanguageProficiency}
        size="1"
      />
    </FormFieldContainer>
  )
}

export { ProficiencySelect }
