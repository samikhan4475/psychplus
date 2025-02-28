import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const LanguageAbilitySelect = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className="!text-1">Language ability</FormFieldLabel>
      <CodesetSelect
        name="languageAbility"
        codeset={CODESETS.LanguageAbility}
        size="1"
      />
    </FormFieldContainer>
  )
}

export { LanguageAbilitySelect }
