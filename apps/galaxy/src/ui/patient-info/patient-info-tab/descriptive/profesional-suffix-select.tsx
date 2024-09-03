import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const ProfessionalSuffixSelect = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Prof. Suffix</FormFieldLabel>
      <CodesetSelect
        name="professionalSuffix"
        codeset={CODESETS.ProfSuffix}
        size="1"
      />
    </FormFieldContainer>
  )
}

export { ProfessionalSuffixSelect }
