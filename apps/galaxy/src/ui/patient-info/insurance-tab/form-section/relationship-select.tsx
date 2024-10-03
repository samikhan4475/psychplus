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
      <FormFieldLabel required className="!text-1">
        Relationship
      </FormFieldLabel>
      <CodesetSelect
        name="policyHolderRelationship"
        placeholder="Select relationship"
        codeset={CODESETS.InsuranceRelationship}
        size="1"
        className="h-7"
      />

      <FormFieldError name="policyHolderRelationship" />
    </FormFieldContainer>
  )
}

export { RelationshipSelect }
