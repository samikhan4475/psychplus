'use client'

import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

const RelationshipSelect = () => {
  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1">Relationship</FormFieldLabel>
      <CodesetSelect
        name="policyHolderRelationship"
        placeholder="Select relationship"
        codeset={CODESETS.InsuranceRelationship}
        size="2"
        className="h-7 w-full text-1"
      />

      <FormFieldError name="policyHolderRelationship" />
    </FormFieldContainer>
  )
}

export { RelationshipSelect }
