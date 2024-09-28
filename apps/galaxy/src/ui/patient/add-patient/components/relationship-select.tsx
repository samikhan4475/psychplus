import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

const RelationshipSelect = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Relationship</FormFieldLabel>
      <CodesetSelect
        name="relationship"
        codeset={CODESETS.GuardianRelationship}
        size="1"
        placeholder="Select"
      />
      <FormFieldError name={'relationship'} />
    </FormFieldContainer>
  )
}

export { RelationshipSelect }
