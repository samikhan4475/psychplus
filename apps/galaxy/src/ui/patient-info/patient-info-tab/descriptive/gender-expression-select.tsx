import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const GenderExpressionSelect = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Gender Expression</FormFieldLabel>
      <CodesetSelect
        name="genderExpression"
        codeset={CODESETS.GenderExpression}
        size="1"
      />
    </FormFieldContainer>
  )
}

export { GenderExpressionSelect }
