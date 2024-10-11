import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const ProfessionalSuffixSelect = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className="!text-1">Prof. Suffix</FormFieldLabel>
      <CodesetSelect
        name="legalName.honors"
        codeset={CODESETS.ProfSuffix}
        size="1"
      />
    </FormFieldContainer>
  )
}

export { ProfessionalSuffixSelect }
