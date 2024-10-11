import { CodesetSelect } from '@/components'
import { CODESETS } from '@/constants'

const LanguageAbilitySelect = () => {
  return (
    <CodesetSelect
      name="languageAbility"
      placeholder="Select Language"
      codeset={CODESETS.LanguageAbility}
      size="1"
    />
  )
}

export { LanguageAbilitySelect }
