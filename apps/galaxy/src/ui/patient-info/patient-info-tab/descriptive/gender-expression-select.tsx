import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const GenderExpressionSelect = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className="!text-1">Gender Expression</FormFieldLabel>
      <CodesetSelect
        name="genderExpression"
        codeset={CODESETS.GenderExpression}
        size="1"
      />
    </FormFieldContainer>
  )
}

export { GenderExpressionSelect }
