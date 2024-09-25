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
        name="relationship"
        codeset={CODESETS.Relationship}
        size="1"
      />
      <FormFieldError name="relationship" />
    </FormFieldContainer>
  )
}

export { RelationshipSelect }
